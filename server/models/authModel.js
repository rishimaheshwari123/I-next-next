const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    permissions: {
      type: {
        dashboard: { type: Boolean, default: false },
        blogs: { type: Boolean, default: false },
        clientPlans: { type: Boolean, default: false },
        manageClients: { type: Boolean, default: false },
        serverHosting: { type: Boolean, default: false },
        contacts: { type: Boolean, default: false },
        domainInquiries: { type: Boolean, default: false },
        advertisements: { type: Boolean, default: false },
        supportTickets: { type: Boolean, default: false },
        contactInquiries: { type: Boolean, default: false },
        aiChatbot: { type: Boolean, default: false },
        employees: { type: Boolean, default: false },
        attendance: { type: Boolean, default: false },
        leaveRequests: { type: Boolean, default: false },
        tasks: { type: Boolean, default: false },
        leadManagement: { type: Boolean, default: false },
        staffManagement: { type: Boolean, default: false },
      },
      default: {},
      _id: false, // Disable _id for subdocument
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },

    token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);
