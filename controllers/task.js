const Task = require("../models/task");

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});

    res.send(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const { task } = req.body;

    const newTask = new Task({ task });

    await newTask.save();

    res.send(newTask);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, { completed });

    if (!updatedTask) {
      res.status(404).send("Task not found");
    } else {
      res.send(updatedTask);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      res.status(404).send("Task not found");
    } else {
      res.send("Task deleted successfully");
    }
  } catch (err) {
    next(err);
  }
};
