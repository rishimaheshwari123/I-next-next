const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  updateTaskFeedback,
  deleteTask,
  getEmployeeTasks,
  getClientTasks,
  addFeedbackComment,
} = require("../controllers/projectTaskCtrl");
const { auth, isAdmin, isClient } = require("../middleware/auth");

// Client-specific tasks retrieval
router.get("/client/client-tasks", auth, isClient, getClientTasks);

// Employee-specific tasks retrieval
router.get("/employee/my-tasks", auth, getEmployeeTasks);

// Tasks by Project ID (anyone authenticated can view if assigned/owner)
router.get("/project/:projectId", auth, getTasksByProject);

// Create task (Admin only)
router.post("/", auth, isAdmin, createTask);

// Update status (Admin, Employee, or Client can update status)
router.put("/:taskId/status", auth, updateTaskStatus);

// Client adds feedback & toggles status (Client only)
router.put("/:taskId/feedback", auth, isClient, updateTaskFeedback);

// Add feedback comment / reply (Admin, Employee, or Client)
router.post("/:taskId/feedback/comment", auth, addFeedbackComment);

// Delete task (Admin only)
router.delete("/:taskId", auth, isAdmin, deleteTask);

module.exports = router;
