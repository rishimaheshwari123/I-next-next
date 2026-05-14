const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getTaskMessages,
  editMessage,
  deleteMessage,
  markAsRead,
  getUnreadCount,
  markAllAsRead,
} = require("../controllers/taskChatCtrl");
const { auth } = require("../middleware/auth");

// Task chat routes (both admin and employee)
router.post("/:taskId/message", auth, sendMessage);
router.get("/:taskId/messages", auth, getTaskMessages);
router.put("/message/:chatId", auth, editMessage);
router.delete("/message/:chatId", auth, deleteMessage);
router.put("/message/:chatId/read", auth, markAsRead);
router.put("/:taskId/read-all", auth, markAllAsRead);
router.get("/unread-count", auth, getUnreadCount);

module.exports = router;
