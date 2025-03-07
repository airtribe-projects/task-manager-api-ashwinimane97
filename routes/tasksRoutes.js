const express = require('express');
const router = express.Router();
const taskController = require('../controller/tasksController')

router.get("/", taskController.getAllTasks);

router.get("/priority/:level", taskController.getTaskByPriority);

router.get("/:id", taskController.getTaskById);

router.post("/", taskController.createTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask)

module.exports = router