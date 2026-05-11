const ContactInquiry = require('../models/contactInquiryModel');

// Create contact inquiry (Public)
const createContactInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
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

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    const inquiry = await ContactInquiry.create({
      name,
      email,
      phone,
      subject,
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.',
      inquiry: {
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject
      }
    });

  } catch (error) {
    console.error('Error creating contact inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Error submitting inquiry. Please try again.'
    });
  }
};

// Get all contact inquiries (Admin only)
const getAllContactInquiries = async (req, res) => {
  try {
    const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalInquiries: inquiries.length,
      inquiries
    });

  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching inquiries'
    });
  }
};

// Get inquiry statistics (Admin only)
const getInquiryStats = async (req, res) => {
  try {
    const total = await ContactInquiry.countDocuments();
    
    // Get today's inquiries
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await ContactInquiry.countDocuments({
      createdAt: { $gte: today }
    });

    // Get this week's inquiries
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = await ContactInquiry.countDocuments({
      createdAt: { $gte: weekAgo }
    });

    // Get this month's inquiries
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const monthCount = await ContactInquiry.countDocuments({
      createdAt: { $gte: monthAgo }
    });

    return res.status(200).json({
      success: true,
      stats: {
        total,
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount
      }
    });

  } catch (error) {
    console.error('Error fetching inquiry stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
};

module.exports = {
  createContactInquiry,
  getAllContactInquiries,
  getInquiryStats
};
