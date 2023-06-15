import React, { useState } from "react";
import Todo from "./Todo";

export default function Todos() {
  const [tasks, settasks] = useState([
    {
      _id: 1,
      task: "task1",
      completed: false,
    },
    {
      _id: 2,
      task: "task2",
      completed: false,
    },
    {
      _id: 3,
      task: "task3",
      completed: false,
    },
  ]);

  const [taskText, settaskText] = useState("");

  const handleUpdateTask = (taskId, completed) => {
    settasks(
      tasks.map((task) => (task._id == taskId ? { ...task, completed } : task))
    );
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = () => {
    if (taskText.trim() === "") return;

    settasks([
      ...tasks,
      {
        task: taskText,
        completed: false,
      },
    ]);
    settaskText("");
  };

  const handleDeleteTask = (taskId) => {
    settasks(tasks.filter((task) => task._id != taskId));
  };

  return (
    <div>
      <input
        type="text"
        value={taskText}
        className="form-control"
        placeholder="add task"
        onChange={(e) => settaskText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button className="btn btn-primary" onClick={addTask}>
        Add
      </button>
      <div>
        {tasks.map((task) => (
          <Todo
            todo={task}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}
