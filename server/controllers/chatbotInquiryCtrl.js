const ChatbotInquiry = require('../models/chatbotInquiryModel');

// Create chatbot inquiry (Public)
const createChatbotInquiry = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      serviceInterest, 
      budget, 
      timeline, 
      projectDetails,
      conversationHistory 
    } = req.body;

    // Validation
    if (!name || !email || !phone || !serviceInterest) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    const inquiry = await ChatbotInquiry.create({
      name,
      email,
      phone,
      serviceInterest,
      budget,
      timeline,
      projectDetails,
      conversationHistory
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Our team will contact you soon.',
      inquiry: {
        name: inquiry.name,
        email: inquiry.email,
        serviceInterest: inquiry.serviceInterest
      }
    });

  } catch (error) {
    console.error('Error creating chatbot inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Error submitting inquiry. Please try again.'
    });
  }
};

// Get all chatbot inquiries (Admin only)
const getAllChatbotInquiries = async (req, res) => {
  try {
    const inquiries = await ChatbotInquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalInquiries: inquiries.length,
      inquiries
    });

  } catch (error) {
    console.error('Error fetching chatbot inquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching inquiries'
    });
  }
};

// Get inquiry statistics (Admin only)
const getChatbotStats = async (req, res) => {
  try {
    const total = await ChatbotInquiry.countDocuments();
    
    // Get today's inquiries
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await ChatbotInquiry.countDocuments({
      createdAt: { $gte: today }
    });

    // Get this week's inquiries
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = await ChatbotInquiry.countDocuments({
      createdAt: { $gte: weekAgo }
    });

    // Service interest breakdown
    const serviceBreakdown = await ChatbotInquiry.aggregate([
      {
        $group: {
          _id: '$serviceInterest',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        total,
        today: todayCount,
        thisWeek: weekCount,
        serviceBreakdown
      }
    });

  } catch (error) {
    console.error('Error fetching chatbot stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
};

module.exports = {
  createChatbotInquiry,
  getAllChatbotInquiries,
  getChatbotStats
};
