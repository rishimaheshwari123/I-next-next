const mongoose = require('mongoose');

const chatbotInquirySchema = new mongoose.Schema({
  // User Details
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  
  // Chatbot Conversation
  serviceInterest: {
    type: String,
    required: true
  },
  budget: {
    type: String
  },
  timeline: {
    type: String
  },
  projectDetails: {
    type: String
  },
  
  // Full conversation history
  conversationHistory: [{
    question: String,
    answer: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatbotInquiry', chatbotInquirySchema);
