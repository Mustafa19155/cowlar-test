const taskService = require("../services/taskService");

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();

    return res.send(tasks);
  } catch (err) {
    next(err);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const { task } = req.body;

    const taskCreated = await taskService.createTask({ task });

    return res.send(taskCreated);
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { completed } = req.body;

    const updatedTask = await taskService.updateTask({ id, completed });

    if (!updatedTask) {
      res.status(404).send("Task not found");
    } else {
      res.send(updatedTask);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await taskService.deleteTask({ id });
    if (!deletedTask) {
      res.status(404).send("Task not found");
    } else {
      res.send("Task deleted successfully");
    }
  } catch (err) {
    next(err);
  }
};
