import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ItemsList from "../components/ItemsList";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("ItemsList Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render the component correctly", () => {
    render(<ItemsList />);
    expect(screen.getByText(/Welcome back, Friend!/i)).toBeInTheDocument();
  });

  it("should load tasks from localStorage", () => {
    const tasks = [
      { id: "1", title: "Test Task 1", status: false },
      { id: "2", title: "Test Task 2", status: true },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render(<ItemsList />);
    expect(screen.getByText(/Test Task 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Task 2/i)).toBeInTheDocument();
  });

  it("should add a new task", async () => {
    render(<ItemsList />);
    const input = screen.getByLabelText(/Task name/i);
    const addButton = screen.getByRole("button", { name: /Add Task/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/New Task/i)).toBeInTheDocument();
    });
  });

  it("should update a task's status", async () => {
    const tasks = [{ id: "1", title: "Test Task", status: false }];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render(<ItemsList />);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  it("should remove a task", async () => {
    const tasks = [{ id: "1", title: "Test Task", status: false }];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render(<ItemsList />);
    const deleteButton = screen.getByLabelText(/delete/i);

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Test Task/i)).not.toBeInTheDocument();
    });
  });

  it("should open and close the edit modal", async () => {
    const tasks = [{ id: "1", title: "Test Task", status: false }];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render(<ItemsList />);
    const editButton = screen.getByLabelText(/edit/i);

    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    });

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(/Edit Task/i)).not.toBeInTheDocument();
    });
  });

  it("should edit a task", async () => {
    const tasks = [{ id: "1", title: "Test Task", status: false }];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render(<ItemsList />);
    const editButton = screen.getByLabelText(/edit/i);

    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByText(/Edit Task/i)).toBeInTheDocument();
    });

    const input = screen.getByDisplayValue(/Test Task/i);
    const saveButton = screen.getByRole("button", { name: /Save/i });

    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Updated Task/i)).toBeInTheDocument();
    });
  });
});
