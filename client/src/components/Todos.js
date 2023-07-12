import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import {
  getTasks as getTasksApi,
  createTask,
  deleteTask,
  updateTask,
} from "../api/tasks";
import Loader from "./Loader";
import Notification from "./Notification";

export default function Todos() {
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState(null);
  const [tasks, settasks] = useState([]);

  const [taskText, settaskText] = useState("");

  const getTasks = async () => {
    setloading(true);
    getTasksApi()
      .then((res) => {
        setloading(false);
        settasks(res);
      })
      .catch((err) => {
        setloading(false);
      });
  };

  const handleUpdateTask = async (taskId, completed) => {
    setloading(true);
    updateTask({ taskId, completed })
      .then((res) => {
        setloading(false);
        settasks(
          tasks.map((task) =>
            task._id == taskId ? { ...task, completed } : task
          )
        );
      })
      .catch((err) => {
        setloading(false);
      });

    settaskText("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const addTask = async () => {
    if (taskText.trim() === "") return;
    setloading(true);
    createTask({ taskText })
      .then((res) => {
        setmessage({ message: "Todo Added Successfully", success: true });
        setloading(false);
        settasks([...tasks, res]);

        settaskText("");
      })
      .catch((err) => {
        setmessage({ message: "Todo Not Added", success: false });
        setloading(false);
      });
  };

  const handleDeleteTask = async (taskId) => {
    setloading(true);
    deleteTask({ taskId })
      .then((res) => {
        setmessage({ message: "Todo Deleted Successfully", success: true });
        setloading(false);
        settasks(tasks.filter((task) => task._id != taskId));
      })
      .catch((err) => {
        setmessage({ message: "Todo Deletion Failed", success: false });
        setloading(false);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <div className="text-center d-flex justify-content-center my-3">
        <Notification message={message} setmessage={setmessage} />
      </div>
      <Loader isOpen={loading} />
      <div className="d-flex gap-4 mb-3">
        <input
          type="text"
          value={taskText}
          className="form-control task-input py-2 form-control-lg"
          placeholder="add task"
          onChange={(e) => settaskText(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="btn btn-lg btn-danger px-3 text-nowrap"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {tasks?.length > 0 ? (
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
      ) : (
        <div className="">
          <h5 className="text-white text-center mt-5">No Todos Added</h5>
        </div>
      )}
    </div>
  );
}
