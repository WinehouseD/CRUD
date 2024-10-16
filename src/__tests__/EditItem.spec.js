import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditItem from "../components/EditItem";
import { titleValidation } from "../utils/validation";

jest.mock("../utils/validation", () => ({
  titleValidation: jest.fn(),
}));

describe("EditItem Component", () => {
  const mockOnEditTask = jest.fn();
  const mockHandleClose = jest.fn();
  const taskToEdit = { id: 1, title: "Test Task" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(
      <EditItem
        taskToEdit={taskToEdit}
        onEditTask={mockOnEditTask}
        open={true}
        handleClose={mockHandleClose}
      />
    );
    expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    expect(screen.getByText(/Update the task name:/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Test Task/i)).toBeInTheDocument();
  });

  it("should update the input field correctly", () => {
    render(
      <EditItem
        taskToEdit={taskToEdit}
        onEditTask={mockOnEditTask}
        open={true}
        handleClose={mockHandleClose}
      />
    );
    const input = screen.getByDisplayValue(/Test Task/i);
    fireEvent.change(input, { target: { value: "new task" } });
    expect(input.value).toBe("New task");
  });

  it("should call onEditTask with the correct value when form is submitted", () => {
    titleValidation.mockReturnValueOnce("");
    render(
      <EditItem
        taskToEdit={taskToEdit}
        onEditTask={mockOnEditTask}
        open={true}
        handleClose={mockHandleClose}
      />
    );
    const input = screen.getByDisplayValue(/Test Task/i);
    const saveButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(input, { target: { value: "new task" } });
    fireEvent.click(saveButton);

    expect(mockOnEditTask).toHaveBeenCalledWith(taskToEdit.id, "New task");
    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("should display validation error when input is invalid", () => {
    const validationError = "Task name is required";
    titleValidation.mockReturnValueOnce(validationError);
    render(
      <EditItem
        taskToEdit={taskToEdit}
        onEditTask={mockOnEditTask}
        open={true}
        handleClose={mockHandleClose}
      />
    );
    const input = screen.getByDisplayValue(/Test Task/i);
    const saveButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(saveButton);

    expect(screen.getByText(validationError)).toBeInTheDocument();
    expect(mockOnEditTask).not.toHaveBeenCalled();
  });

  it("should clear the error when input is changed", () => {
    const validationError = "Task name is required";
    titleValidation.mockReturnValueOnce(validationError);
    render(
      <EditItem
        taskToEdit={taskToEdit}
        onEditTask={mockOnEditTask}
        open={true}
        handleClose={mockHandleClose}
      />
    );
    const input = screen.getByDisplayValue(/Test Task/i);
    const saveButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(saveButton);

    expect(screen.getByText(validationError)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new task" } });
    expect(screen.queryByText(validationError)).not.toBeInTheDocument();
  });

  it("should close the dialog when the cancel button is clicked", () => {
    render(
      <EditItem
        taskToEdit={taskToEdit}
        onEditTask={mockOnEditTask}
        open={true}
        handleClose={mockHandleClose}
      />
    );
    const cancelButton = screen.getByRole("button", { name: /Cancel/i });

    fireEvent.click(cancelButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });
});
