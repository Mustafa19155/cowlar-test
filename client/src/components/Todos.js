import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";

export default function Todos() {
  const [tasks, settasks] = useState([]);

  const [taskText, settaskText] = useState("");

  const getTasks = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/tasks`
      );
      settasks(res.data);
    } catch (err) {}
  };

  const handleUpdateTask = async (taskId, completed) => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/api/tasks/${taskId}`, {
        completed,
      });
      settasks(
        tasks.map((task) =>
          task._id == taskId ? { ...task, completed } : task
        )
      );

      settaskText("");
    } catch (err) {}
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = async () => {
    if (taskText.trim() === "") return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/tasks`,
        {
          task: taskText,
        }
      );
      settasks([...tasks, res.data]);
      settaskText("");
    } catch (err) {}
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/tasks/${taskId}`
      );
      settasks(tasks.filter((task) => task._id != taskId));
    } catch (err) {}
  };

  useEffect(() => {
    getTasks();
  }, []);

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
