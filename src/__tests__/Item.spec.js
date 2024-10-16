import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Item from "../components/Item";

describe("Item Component", () => {
  const mockOnUpdateStatus = jest.fn();
  const mockOnRemoveTask = jest.fn();
  const mockOnEditTask = jest.fn();
  const task = { id: 1, title: "Test Task", status: false };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component correctly", () => {
    render(
      <Item
        id={task.id}
        title={task.title}
        status={task.status}
        onUpdateStatus={mockOnUpdateStatus}
        onRemoveTask={mockOnRemoveTask}
        onEditTask={mockOnEditTask}
      />
    );
    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(screen.getByLabelText(/edit/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delete/i)).toBeInTheDocument();
  });

  it("should update the status when the checkbox is clicked", () => {
    render(
      <Item
        id={task.id}
        title={task.title}
        status={task.status}
        onUpdateStatus={mockOnUpdateStatus}
        onRemoveTask={mockOnRemoveTask}
        onEditTask={mockOnEditTask}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnUpdateStatus).toHaveBeenCalledWith(task.id);
  });

  it("should call onEditTask when the edit button is clicked", () => {
    render(
      <Item
        id={task.id}
        title={task.title}
        status={task.status}
        onUpdateStatus={mockOnUpdateStatus}
        onRemoveTask={mockOnRemoveTask}
        onEditTask={mockOnEditTask}
      />
    );
    const editButton = screen.getByLabelText(/edit/i);
    fireEvent.click(editButton);
    expect(mockOnEditTask).toHaveBeenCalled();
  });

  it("should call onRemoveTask when the delete button is clicked", () => {
    render(
      <Item
        id={task.id}
        title={task.title}
        status={task.status}
        onUpdateStatus={mockOnUpdateStatus}
        onRemoveTask={mockOnRemoveTask}
        onEditTask={mockOnEditTask}
      />
    );
    const deleteButton = screen.getByLabelText(/delete/i);
    fireEvent.click(deleteButton);
    expect(mockOnRemoveTask).toHaveBeenCalledWith(task.id);
  });
});
