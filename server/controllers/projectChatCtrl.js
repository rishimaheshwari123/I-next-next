const ProjectChat = require("../models/projectChatModel");
const Project = require("../models/projectModel");

// Send Message
exports.sendMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { message, senderType, senderName } = req.body;
    const senderId = req.user.id;

    if (!message || !senderType || !senderName) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Create message
    const chat = await ProjectChat.create({
      project: projectId,
      senderId,
      senderType,
      senderName,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: chat,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message,
    });
  }
};

// Get Project Messages
exports.getProjectMessages = async (req, res) => {
  try {
    const { projectId } = req.params;

    const messages = await ProjectChat.find({ project: projectId }).sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching messages",
      error: error.message,
    });
  }
};

// Mark Message as Read
exports.markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await ProjectChat.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Message marked as read",
      data: message,
    });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({
      success: false,
      message: "Error marking message as read",
      error: error.message,
    });
  }
};

// Mark All Messages as Read for a Project
exports.markAllAsRead = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    // Mark all messages as read except sender's own messages
    await ProjectChat.updateMany(
      {
        project: projectId,
        senderId: { $ne: userId },
        isRead: false,
      },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: "All messages marked as read",
    });
  } catch (error) {
    console.error("Error marking all messages as read:", error);
    res.status(500).json({
      success: false,
      message: "Error marking messages as read",
      error: error.message,
    });
  }
};

// Get Unread Message Count
exports.getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const unreadCount = await ProjectChat.countDocuments({
      senderId: { $ne: userId },
      isRead: false,
    });

    res.status(200).json({
      success: true,
      data: { unreadCount },
    });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching unread count",
      error: error.message,
    });
  }
};

// Get Unread Count by Project
exports.getUnreadCountByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const unreadCount = await ProjectChat.countDocuments({
      project: projectId,
      senderId: { $ne: userId },
      isRead: false,
    });

    res.status(200).json({
      success: true,
      data: { unreadCount },
    });
  } catch (error) {
    console.error("Error fetching unread count:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching unread count",
      error: error.message,
    });
  }
};
