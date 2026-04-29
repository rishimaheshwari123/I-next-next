const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'General',
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    
    // SEO Fields
    metaTitle: {
        type: String,
        trim: true
    },
    metaDescription: {
        type: String,
        trim: true
    },
    keywords: {
        type: String,
        trim: true
    },
    canonicalUrl: {
        type: String,
        trim: true
    },
    
    // Open Graph Fields
    ogTitle: {
        type: String,
        trim: true
    },
    ogDescription: {
        type: String,
        trim: true
    },
    ogImage: {
        type: String,
        trim: true
    },
    
    published: {
        type: Boolean,
        default: false
    },
    
    // Keep for backward compatibility
    type: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});



module.exports = mongoose.model("Blog", blogSchema);
