import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  getByPlaceholderText,
} from "@testing-library/react";
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
    const mockTasks = [
      { _id: 1, task: "Task 1", completed: false },
      { _id: 2, task: "Task 2", completed: true },
    ];
    getTasksApi.mockResolvedValueOnce(mockTasks);

    createTask.mockResolvedValueOnce({
      _id: 3,
      task: "New Task",
      completed: false,
    });
    render(<Todos />);
    const input = screen.getByPlaceholderText("add task");
    const addButton = screen.getByRole("button", { name: "Add Task" });
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);
    expect(createTask).toHaveBeenCalledWith({ taskText: "New Task" });
    await screen.findByText("New Task");
  });
  test("should update a task", async () => {
    const mockTasks = [{ _id: 1, task: "Task 1", completed: false }];
    getTasksApi.mockResolvedValueOnce(mockTasks);
    const updatedTask = { _id: 1, task: "Task 1", completed: true };
    updateTask.mockResolvedValueOnce(updatedTask);
    render(<Todos />);

    const checkbox = await screen.findByTestId(1);
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);

    await expect(updateTask).toHaveBeenCalledWith({
      taskId: 1,
      completed: true,
    });

    const checked = await screen.findByTestId(1, { checked: true });
    expect(checked).toBeInTheDocument();
  });
  test("should delete a task", async () => {
    const mockTasks = [{ _id: 1, task: "Task 1", completed: false }];
    getTasksApi.mockResolvedValueOnce(mockTasks);
    deleteTask.mockResolvedValueOnce({});
    render(<Todos />);

    const dropdown = await screen.findByTestId(`dropdown ${1}`);
    expect(dropdown).toBeInTheDocument();
    const firstChildElement = dropdown.querySelector(":first-child");

    fireEvent.click(firstChildElement);

    const deleteButton = await screen.findByText("Delete Task");
    expect(deleteButton).toBeInTheDocument();
    fireEvent.click(deleteButton);
    expect(deleteTask).toHaveBeenCalledWith({ taskId: 1 });
  });
});
