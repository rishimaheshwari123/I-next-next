const express = require('express');
const router = express.Router();
const {
  createContactInquiry,
  getAllContactInquiries,
  getInquiryStats
} = require('../controllers/contactInquiryCtrl');

// Public route
router.post('/create', createContactInquiry);

// Admin routes
router.get('/getAll', getAllContactInquiries);
router.get('/stats', getInquiryStats);

module.exports = router;
