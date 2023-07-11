const Task = require("../models/task");

module.exports.createTask = ({ task }) => {
  const newTask = new Task({ task });
  return newTask.save();
};
module.exports.getAllTasks = () => {
  return Task.find();
};
module.exports.updateTask = ({ id, completed }) => {
  const udpate = {
    completed: completed,
  };

  if (completed) {
    udpate["completedTime"] = Date.now();
  }

  return Task.findByIdAndUpdate(id, {
    $set: udpate,
  });
};
module.exports.deleteTask = ({ id }) => {
  return Task.findByIdAndDelete(id);
};
