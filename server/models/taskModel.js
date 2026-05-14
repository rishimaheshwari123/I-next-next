const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    deadline: {
      type: Date,
      required: true,
    },
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    completedAt: {
      type: Date,
      default: null,
    },
    tags: [String],
    estimatedHours: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Update completedAt when status changes to completed
taskSchema.pre("save", function (next) {
  if (this.status === "completed" && !this.completedAt) {
    this.completedAt = new Date();
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
