import React from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function Todo({ todo, handleUpdateTask, handleDeleteTask }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center px-3 pt-3">
        <div className="d-flex align-item-center gap-2">
          <input
            type="checkbox"
            checked={todo.completed}
            className={`form-check-input task-check ${
              todo.completed ? "checked" : "bg-transparent border-dark"
            }`}
            onChange={() => handleUpdateTask(todo._id, !todo.completed)}
          />
          <p className="m-0">{todo.task}</p>
        </div>
        <div className="dropdown">
          <a
            className="text-gray-400 text-decoration-none"
            data-bs-toggle="dropdown"
            href="#"
          >
            <FiMoreVertical style={{ color: "black" }} />
          </a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item m-0 btn text-center bg-danger text-white rounded py-2"
              onClick={() => handleDeleteTask(todo._id)}
            >
              Delete Task
            </a>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}
