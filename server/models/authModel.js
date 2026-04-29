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

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },

    token: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("auth", authSchema);
