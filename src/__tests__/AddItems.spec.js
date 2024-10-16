import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddItem from "../components/AddItem";
import { titleValidation } from "../utils/validation";

jest.mock("../utils/validation", () => ({
  titleValidation: jest.fn(),
}));

describe("AddItem Component", () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(<AddItem onAddTask={mockOnAddTask} />);
    expect(screen.getByLabelText(/Task name/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Task/i })
    ).toBeInTheDocument();
  });

  it("should update the input field correctly", () => {
    render(<AddItem onAddTask={mockOnAddTask} />);
    const input = screen.getByLabelText(/Task name/i);
    fireEvent.change(input, { target: { value: "new task" } });
    expect(input.value).toBe("New task");
  });

  it("should call onAddTask with the correct value when form is submitted", () => {
    titleValidation.mockReturnValueOnce("");
    render(<AddItem onAddTask={mockOnAddTask} />);
    const input = screen.getByLabelText(/Task name/i);
    const button = screen.getByRole("button", { name: /Add Task/i });

    fireEvent.change(input, { target: { value: "new task" } });
    fireEvent.click(button);

    expect(mockOnAddTask).toHaveBeenCalledWith("New task");
    expect(input.value).toBe("");
  });

  it("should display validation error when input is invalid", () => {
    const validationError = "Task name is required";
    titleValidation.mockReturnValueOnce(validationError);
    render(<AddItem onAddTask={mockOnAddTask} />);
    const input = screen.getByLabelText(/Task name/i);
    const button = screen.getByRole("button", { name: /Add Task/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(screen.getByText(validationError)).toBeInTheDocument();
    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it("should clear the error when input is changed", () => {
    const validationError = "Task name is required";
    titleValidation.mockReturnValueOnce(validationError);
    render(<AddItem onAddTask={mockOnAddTask} />);
    const input = screen.getByLabelText(/Task name/i);
    const button = screen.getByRole("button", { name: /Add Task/i });

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(screen.getByText(validationError)).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "new task" } });
    expect(screen.queryByText(validationError)).not.toBeInTheDocument();
  });
});
