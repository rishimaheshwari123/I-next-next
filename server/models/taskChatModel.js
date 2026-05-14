const mongoose = require("mongoose");

const taskChatSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel",
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["auth", "Employee"],
    },
    senderName: {
      type: String,
      required: true,
    },
    senderRole: {
      type: String,
      required: true,
      enum: ["admin", "employee"],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        fileType: String,
        fileSize: Number,
      },
    ],
    isRead: {
      type: Boolean,
      default: false,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
taskChatSchema.index({ taskId: 1, createdAt: -1 });

module.exports = mongoose.model("TaskChat", taskChatSchema);
