const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    planType: {
      type: String,
      required: true,
      trim: true,
    },
    planPrice: {
      type: String,
      required: true,
    },
    planFeatures: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["inactive", "active", "expired"],
      default: "inactive",
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    activationDate: {
      type: Date,
      default: null,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", planSchema);
