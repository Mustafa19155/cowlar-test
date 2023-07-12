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
          />
          <p className="m-0 h5 fw-normal">{todo.task}</p>
        </div>
        <div className="dropdown" role="button">
          <a
            className="text-gray-400 text-decoration-none"
            data-bs-toggle="dropdown"
          >
            <FiMoreVertical style={{ color: "black" }} />
          </a>
          <div className="dropdown-menu">
            <a
              className="dropdown-item px-3 pb-3 disabled text-center"
              style={{
                fontStyle: "italic",
                borderBottom: "1px solid #F1F4F8",
              }}
            >
              Actions
            </a>
            <a
              className="dropdown-item px-3 py-3 pointer bg-white text-dark"
              style={{
                fontStyle: "italic",
                cursor: "pointer",
              }}
              onClick={() => handleDeleteTask(todo._id)}
            >
              Delete Task
            </a>
          </div>
        </div>
      </div>
      <div className="px-3 pb-3 pt-2">
        <small>
          <span className="fw-bold">Created: </span>
          <span>
            <Moment fromNow>{todo.creationTime}</Moment>
          </span>
        </small>
      </div>
      <hr className="m-0 p-0" />
    </div>
  );
}
