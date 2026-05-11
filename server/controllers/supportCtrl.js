const Support = require('../models/supportModel');

// Create support ticket (Public)
const createSupportTicket = async (req, res) => {
  try {
    const { name, email, phone, subject, message, priority } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, subject, message)'
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

    const ticket = await Support.create({
      name,
      email,
      phone: phone || '',
      subject,
      message,
      priority: priority || 'Medium'
    });

    return res.status(201).json({
      success: true,
      message: 'Support ticket created successfully! We will get back to you soon.',
      ticket: {
        ticketNumber: ticket.ticketNumber,
        name: ticket.name,
        email: ticket.email,
        subject: ticket.subject,
        status: ticket.status
      }
    });

  } catch (error) {
    console.error('Error creating support ticket:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating support ticket. Please try again.'
    });
  }
};

// Get all support tickets (Admin only)
const getAllSupportTickets = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const tickets = await Support.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalTickets: tickets.length,
      tickets
    });

  } catch (error) {
    console.error('Error fetching support tickets:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching support tickets'
    });
  }
};

// Get single support ticket (Admin only)
const getSingleSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Support.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    return res.status(200).json({
      success: true,
      ticket
    });

  } catch (error) {
    console.error('Error fetching support ticket:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching support ticket'
    });
  }
};

// Update support ticket status (Admin only)
const updateSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    const validStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Valid statuses: Open, In Progress, Resolved, Closed'
      });
    }

    const ticket = await Support.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ticket status updated successfully',
      ticket
    });

  } catch (error) {
    console.error('Error updating support ticket:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating support ticket'
    });
  }
};

// Delete support ticket (Admin only)
const deleteSupportTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Support.findByIdAndDelete(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Support ticket deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting support ticket:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting support ticket'
    });
  }
};

// Get ticket statistics (Admin only)
const getTicketStats = async (req, res) => {
  try {
    const total = await Support.countDocuments();
    const open = await Support.countDocuments({ status: 'Open' });
    const inProgress = await Support.countDocuments({ status: 'In Progress' });
    const resolved = await Support.countDocuments({ status: 'Resolved' });
    const closed = await Support.countDocuments({ status: 'Closed' });

    return res.status(200).json({
      success: true,
      stats: {
        total,
        open,
        inProgress,
        resolved,
        closed
      }
    });

  } catch (error) {
    console.error('Error fetching ticket stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching ticket statistics'
    });
  }
};

module.exports = {
  createSupportTicket,
  getAllSupportTickets,
  getSingleSupportTicket,
  updateSupportTicket,
  deleteSupportTicket,
  getTicketStats
};
