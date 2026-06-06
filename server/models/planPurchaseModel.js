const mongoose = require("mongoose");

const planPurchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Online"],
      default: "Cash",
    },
    status: {
      type: String,
      enum: ["pending", "active", "expired", "rejected"],
      default: "pending",
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
    adminNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PlanPurchase", planPurchaseSchema);
