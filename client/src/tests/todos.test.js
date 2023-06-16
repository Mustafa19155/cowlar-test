import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Todos from "../components/Todos";
import {
  getTasks as getTasksApi,
  createTask,
  deleteTask,
  updateTask,
} from "../api/tasks";

jest.mock("../api/tasks", () => ({
  getTasks: jest.fn(),
  createTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
}));

describe("Todos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the Todos component", () => {
    render(<Todos />);

    // Assert that the input and add button are rendered
    expect(screen.getByPlaceholderText("add task")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  test("should display tasks", async () => {
    const mockTasks = [
      { _id: 1, task: "Task 1", completed: false },
      { _id: 2, task: "Task 2", completed: true },
    ];
    getTasksApi.mockResolvedValueOnce(mockTasks);

    render(<Todos />);

    // Assert that the tasks are displayed
    await screen.findByText("Task 1");
    await screen.findByText("Task 2");
  });

  test("should add a new task", async () => {
    createTask.mockResolvedValueOnce({
      _id: 3,
      task: "New Task",
      completed: false,
    });

    render(<Todos />);
    const input = screen.getByPlaceholderText("add task");
    const addButton = screen.getByRole("button", { name: "Add" });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    // Assert that createTask is called with the correct task text
    expect(createTask).toHaveBeenCalledWith({ taskText: "New Task" });

    // Assert that the new task is displayed
    await screen.findByText("New Task");
  });

  test("should update a task", async () => {
    const mockTasks = [{ _id: 1, task: "Task 1", completed: false }];
    getTasksApi.mockResolvedValueOnce(mockTasks);

    const updatedTask = { _id: 1, task: "Task 1", completed: true };
    updateTask.mockResolvedValueOnce(updatedTask);

    render(<Todos />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    // Assert that updateTask is called with the correct taskId and completed value
    expect(updateTask).toHaveBeenCalledWith({ taskId: 1, completed: true });

    // Assert that the task is updated and displayed
    await screen.findByRole("checkbox", { checked: true });
  });

  test("should delete a task", async () => {
    const mockTasks = [{ _id: 1, task: "Task 1", completed: false }];
    getTasksApi.mockResolvedValueOnce(mockTasks);

    render(<Todos />);
    const deleteButton = screen.getByRole("button", { name: "Delete Task" });
    fireEvent.click(deleteButton);

    // Assert that deleteTask is called with the correct taskId
    expect(deleteTask).toHaveBeenCalledWith({ taskId: 1 });

    // Assert that the task is deleted and no longer displayed
    await screen.findByText("No tasks found.");
  });
});
