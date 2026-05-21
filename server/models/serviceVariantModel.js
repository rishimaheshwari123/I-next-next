const mongoose = require("mongoose");

const serviceVariantSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    variantName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    pages: {
      type: Number,
      default: 1,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    timeline: {
      type: Number,
      required: true,
      // in days
    },
    amount: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceVariant", serviceVariantSchema);
