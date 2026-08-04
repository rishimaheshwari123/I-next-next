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
    
    // New fields from the images
    shortDescription: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        default: 'Admin',
        trim: true
    },
    tags: {
        type: [String],
        default: []
    },
    altText: {
        type: String,
        trim: true
    },
    focusKeyword: {
        type: String,
        trim: true
    },
    noIndex: {
        type: Boolean,
        default: false
    },
    faqs: [
        {
            question: { type: String, trim: true },
            answer: { type: String, trim: true }
        }
    ],
    articleSchema: {
        type: Boolean,
        default: true
    },
    faqSchema: {
        type: Boolean,
        default: false
    },
    breadcrumbSchema: {
        type: Boolean,
        default: true
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
