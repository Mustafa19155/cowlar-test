import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import Moment from "react-moment";

export default function Todo({ todo, handleUpdateTask, handleDeleteTask }) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center px-3 pt-3">
        <div className="d-flex align-item-center gap-2">
          <input
            role="button"
            type="checkbox"
            checked={todo.completed}
            className={`form-check-input task-check ${
              todo.completed ? "checked" : "bg-transparent border-dark"
            }`}
            onChange={() => handleUpdateTask(todo._id, !todo.completed)}
            data-testid={todo._id}
          />
          <p className="m-0">
            {todo.task}
            <sub>
              {"  "}added: <Moment fromNow>{todo.creationTime}</Moment>
            </sub>
          </p>
        </div>
        <a>asd</a>
        <div className="dropdown" data-testid={`dropdown ${todo._id}`}>
          <a
            className="text-gray-400 text-decoration-none"
            data-bs-toggle="dropdown"
          >
            <FiMoreVertical style={{ color: "black" }} />
          </a>
          <div className="dropdown-menu">
            <a
              role="button"
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
