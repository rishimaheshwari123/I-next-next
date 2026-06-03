const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  features: [
    {
      type: String,
      trim: true,
    },
  ],
  // Web Development Fields
  pages: { type: Number },
  seo: { type: Boolean, default: false },
  ssl: { type: Boolean, default: false },
  speed: { type: String },
  responsive: { type: Boolean, default: false },
  hosting: { type: Number },
  support: { type: Number },
  maintenance: { type: Number },
  timeline: { type: String },
  revisions: { type: Number },

  // Mobile App Development Fields
  platform: [{ type: String }],
  screens: { type: Number },
  uiux: { type: Boolean, default: false },
  appStore: { type: Boolean, default: false },
  api: { type: Boolean, default: false },
  database: { type: Boolean, default: false },

  // Digital Marketing Fields
  type: [{ type: String }],
  budget: { type: Number },
  keywords: { type: Number },
  reporting: { type: Boolean, default: false },
  metrics: { type: Boolean, default: false },
  analytics: { type: Boolean, default: false },
  optimization: { type: Boolean, default: false },
  ctr: { type: Number },
  roi: { type: Number },

  // Social Media Marketing Fields
  platforms: [{ type: String }],
  postsPerWeek: { type: Number },
  contentCalendar: { type: Boolean, default: false },
  contentCreation: { type: Boolean, default: false },
  engagement: { type: Boolean, default: false },
  communityMgmt: { type: Boolean, default: false },
  reports: { type: Boolean, default: false },
  adSpend: { type: Number },

  // Lead Generation Fields
  campaignType: [{ type: String }],
  targetLeads: { type: Number },
  cpl: { type: Number },
  leadQuality: { type: Number },
  leadTracking: { type: Boolean, default: false },
  crmIntegration: { type: Boolean, default: false },
  automation: { type: Boolean, default: false },

  // UI/UX Design Fields
  designType: { type: String },
  wireframes: { type: Boolean, default: false },
  prototype: { type: Boolean, default: false },
  designSystem: { type: Boolean, default: false },
  userResearch: { type: Boolean, default: false },
  usability: { type: Boolean, default: false },
  accessibility: { type: Boolean, default: false },

  // E-commerce Fields
  products: { type: Number },
  categories: { type: Number },
  paymentGateways: { type: Number },
  inventory: { type: Boolean, default: false },
  shipping: { type: Boolean, default: false },

  // Branding Fields
  packageType: { type: String },
  logoVariations: { type: Number },
  logoFormats: [{ type: String }],
  brandGuide: { type: Boolean, default: false },
  colorPalette: { type: Boolean, default: false },
  brandStory: { type: Boolean, default: false },
  collateral: { type: Boolean, default: false },
  socialTemplates: { type: Boolean, default: false },
});

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    variants: [variantSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
