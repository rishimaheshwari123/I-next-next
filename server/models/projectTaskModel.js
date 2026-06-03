const mongoose = require("mongoose");

const projectTaskSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    taskType: {
      type: String,
      required: true,
      enum: ["Today Task", "Weekly Task", "Monthly Task"],
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    clientFeedback: {
      type: String,
      trim: true,
      default: "",
    },
    feedbacks: [
      {
        sender: { type: String, enum: ["Client", "Employee", "Admin"], required: true },
        senderName: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      }
    ],
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProjectTask", projectTaskSchema);
