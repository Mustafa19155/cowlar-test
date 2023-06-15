const taskController = require("../controllers/task");
const express = require("express");

const router = express.Router();

router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
