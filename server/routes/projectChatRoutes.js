const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getProjectMessages,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  getUnreadCountByProject,
} = require("../controllers/projectChatCtrl");
const { auth } = require("../middleware/auth");

// All routes require authentication
router.post("/:projectId/message", auth, sendMessage);
router.get("/:projectId/messages", auth, getProjectMessages);
router.put("/message/:messageId/read", auth, markAsRead);
router.put("/:projectId/read-all", auth, markAllAsRead);
router.get("/unread-count", auth, getUnreadCount);
router.get("/:projectId/unread-count", auth, getUnreadCountByProject);

module.exports = router;
