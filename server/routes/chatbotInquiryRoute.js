const express = require('express');
const router = express.Router();
const {
  createChatbotInquiry,
  getAllChatbotInquiries,
  getChatbotStats
} = require('../controllers/chatbotInquiryCtrl');

// Public route
router.post('/create', createChatbotInquiry);

// Admin routes
router.get('/getAll', getAllChatbotInquiries);
router.get('/stats', getChatbotStats);

module.exports = router;
