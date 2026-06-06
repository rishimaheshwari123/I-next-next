const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    projectType: {
      type: String,
      required: true,
      enum: ["Custom", "Template Based", "Maintenance", "Redesign", "Migration"],
    },
    technologies: {
      type: [String],
      default: [],
    },
    startDate: {
      type: Date,
      required: true,
    },
    expectedEndDate: {
      type: Date,
      required: true,
    },
    actualEndDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Testing", "Completed", "On Hold"],
      default: "Planning",
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    assignedEmployees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    liveUrl: {
      type: String,
      trim: true,
    },
    budget: {
      type: Number,
      default: 0,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    legalDocuments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedBy: { type: String, enum: ["Client", "Admin"], default: "Client" },
        createdAt: { type: Date, default: Date.now },
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("project", projectSchema);
