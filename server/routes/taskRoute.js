const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getMyTasks,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask,
  getTaskStats,
} = require("../controllers/taskCtrl");
const { auth, isAdmin, isEmployee } = require("../middleware/auth");

// Admin routes
router.post("/create", auth, isAdmin, createTask);
router.get("/all", auth, isAdmin, getAllTasks);
router.put("/:id", auth, isAdmin, updateTask);
router.delete("/:id", auth, isAdmin, deleteTask);
router.get("/stats", auth, isAdmin, getTaskStats);

// Employee routes
router.get("/my-tasks", auth, isEmployee, getMyTasks);
router.put("/update-status/:id", auth, isEmployee, updateTaskStatus);

// Common routes
router.get("/:id", auth, getTaskById);

module.exports = router;
