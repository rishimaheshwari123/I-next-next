const mongoose = require("mongoose");

const hostingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    hostingType: {
      type: String,
      required: true,
      enum: ["Shared Hosting", "Individual Hosting"],
    },
    planDuration: {
      type: String,
      required: true,
      enum: ["Monthly", "Yearly"],
    },
    serverType: {
      type: String,
      required: true,
      enum: ["KVM2", "KVM4"],
    },
    domainName: {
      type: String,
      trim: true,
    },
    websiteType: {
      type: String,
      trim: true,
    },
    expectedTraffic: {
      type: String,
      trim: true,
    },
    additionalRequirements: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    activationDate: {
      type: Date,
      default: null,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hosting", hostingSchema);
