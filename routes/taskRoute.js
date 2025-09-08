const express = require("express");
const { readTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
router.get("/",authMiddleware,readTasks);
router.post("/",authMiddleware,createTask);
router.put("/:id",authMiddleware,updateTask);
router.delete("/:id",authMiddleware,deleteTask);

module.exports = router;