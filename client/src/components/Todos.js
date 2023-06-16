import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import {
  getTasks as getTasksApi,
  createTask,
  deleteTask,
  updateTask,
} from "../api/tasks";

export default function Todos() {
  const [tasks, settasks] = useState([]);

  const [taskText, settaskText] = useState("");

  const getTasks = async () => {
    getTasksApi()
      .then((res) => {
        settasks(res);
      })
      .catch((err) => {});
  };

  const handleUpdateTask = async (taskId, completed) => {
    updateTask({ taskId, completed })
      .then((res) => {
        settasks(
          tasks.map((task) =>
            task._id == taskId ? { ...task, completed } : task
          )
        );
      })
      .catch((err) => {});

    settaskText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = async () => {
    if (taskText.trim() === "") return;

    createTask({ taskText })
      .then((res) => {
        settasks([...tasks, res]);

        settaskText("");
      })
      .catch((err) => {});
  };

  const handleDeleteTask = async (taskId) => {
    deleteTask({ taskId })
      .then((res) => {
        settasks(tasks.filter((task) => task._id != taskId));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <div className="d-flex gap-4 mb-3">
        <input
          type="text"
          value={taskText}
          className="form-control task-input py-2"
          placeholder="add task"
          onChange={(e) => settaskText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="btn btn-primary px-3" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="todos-wrapper rounded">
        {tasks.map((task) => (
          <Todo
            key={task._id}
            todo={task}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
