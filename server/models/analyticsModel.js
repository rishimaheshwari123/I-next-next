const mongoose = require("mongoose");

const PageViewSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    title: { type: String },
    referrer: { type: String, default: "" },
    utm: {
      source: { type: String, default: "" },
      medium: { type: String, default: "" },
      campaign: { type: String, default: "" },
      term: { type: String, default: "" },
      content: { type: String, default: "" },
    },
    dwellTime: { type: Number, default: 0 }, // in seconds
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth", index: true },
    userEmail: { type: String, default: "" },
    userName: { type: String, default: "" },
    ip: { type: String, default: "" },
    country: { type: String, default: "India" },
    state: { type: String, default: "Madhya Pradesh" },
    city: { type: String, default: "Bhopal" },
    browser: { type: String, default: "Unknown" },
    os: { type: String, default: "Unknown" },
    deviceType: { type: String, default: "Desktop" },
    isBot: { type: Boolean, default: false, index: true },
    timestamp: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

const VisitorSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    visitorId: { type: String, required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth", index: true },
    userEmail: { type: String, default: "" },
    userName: { type: String, default: "" },
    ip: { type: String, default: "" },
    country: { type: String, default: "India" },
    state: { type: String, default: "Madhya Pradesh" },
    city: { type: String, default: "Bhopal" },
    browser: { type: String, default: "Unknown" },
    os: { type: String, default: "Unknown" },
    deviceType: { type: String, default: "Desktop" },
    referrer: { type: String, default: "" },
    utm: {
      source: { type: String, default: "" },
      medium: { type: String, default: "" },
      campaign: { type: String, default: "" },
      term: { type: String, default: "" },
      content: { type: String, default: "" },
    },
    isConversion: { type: Boolean, default: false, index: true },
    conversionType: { type: String, default: "" },
    isBot: { type: Boolean, default: false, index: true },
    createdAt: { type: Date, default: Date.now, index: true },
    lastActive: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false }
);

// Indexes for aggregations
PageViewSchema.index({ timestamp: -1, isBot: 1 });
VisitorSessionSchema.index({ lastActive: -1, isBot: 1 });

const PageView = mongoose.models.PageView || mongoose.model("PageView", PageViewSchema);
const VisitorSession = mongoose.models.VisitorSession || mongoose.model("VisitorSession", VisitorSessionSchema);

module.exports = { PageView, VisitorSession };
