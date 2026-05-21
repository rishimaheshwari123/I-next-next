const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadTitle: {
      type: String,
      required: [true, "Lead title is required"],
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    leadSource: {
      type: String,
      required: [true, "Lead source is required"],
      enum: [
        "Website",
        "Facebook",
        "Instagram",
        "LinkedIn",
        "Referral",
        "Cold Call",
        "WhatsApp",
        "Other",
      ],
    },
    leadType: {
      type: String,
      required: [true, "Lead type is required"],
      enum: [
        "Web Development",
        "App Development",
        "Digital Marketing",
        "SEO",
        "Graphic Design",
        "Other",
      ],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    budget: {
      type: Number,
      min: 0,
    },
    leadStatus: {
      type: String,
      required: true,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Negotiation",
        "Won",
        "Lost",
        "On Hold",
      ],
      default: "New",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    receivedDate: {
      type: Date,
      default: Date.now,
    },
    expectedClosingDate: {
      type: Date,
    },
    actualClosingDate: {
      type: Date,
    },
    remarks: {
      type: String,
    },
    followUpDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
leadSchema.index({ leadStatus: 1 });
leadSchema.index({ leadSource: 1 });
leadSchema.index({ leadType: 1 });
leadSchema.index({ receivedDate: -1 });
leadSchema.index({ followUpDate: 1 });

module.exports = mongoose.model("Lead", leadSchema);
