const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        priceRange: {
            type: String,
            required: true,
        },
        durationDays: {
            type: Number,
            required: true,
        },
        benefits: {
            type: [String],
            default: [],
        },
        keyFeatures: {
            type: [String],
            default: [],
        },
        additionalFeatures: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Plan", planSchema);
