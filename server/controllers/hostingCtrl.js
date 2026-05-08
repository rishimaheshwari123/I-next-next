const Hosting = require("../models/hostingModel");
const Auth = require("../models/authModel");

// Create a new hosting inquiry
exports.createHostingInquiry = async (req, res) => {
  try {
    const {
      userId,
      hostingType,
      planDuration,
      serverType,
      domainName,
      websiteType,
      expectedTraffic,
      additionalRequirements,
    } = req.body;

    // Validate required fields
    if (!userId || !hostingType || !planDuration || !serverType) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if user exists
    const user = await Auth.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create new hosting inquiry
    const newHosting = await Hosting.create({
      userId,
      hostingType,
      planDuration,
      serverType,
      domainName,
      websiteType,
      expectedTraffic,
      additionalRequirements,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Hosting inquiry submitted successfully! Our team will contact you soon.",
      hosting: newHosting,
    });
  } catch (error) {
    console.error("Error creating hosting inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create hosting inquiry",
      error: error.message,
    });
  }
};

// Get all hosting inquiries (Admin)
exports.getAllHostingInquiries = async (req, res) => {
  try {
    console.log("Fetching all hosting inquiries...");

    const hostings = await Hosting.find()
      .populate("userId", "name email phone company")
      .sort({ createdAt: -1 })
      .lean();

    console.log(`Found ${hostings.length} hosting inquiries`);

    res.status(200).json({
      success: true,
      count: hostings.length,
      hostings,
    });
  } catch (error) {
    console.error("Error fetching hosting inquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hosting inquiries",
      error: error.message,
    });
  }
};

// Get hosting inquiries by user ID (Client)
exports.getHostingByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const hostings = await Hosting.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hostings.length,
      hostings,
    });
  } catch (error) {
    console.error("Error fetching user hosting inquiries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch hosting inquiries",
      error: error.message,
    });
  }
};

// Update hosting inquiry status (Admin only)
exports.updateHostingStatus = async (req, res) => {
  try {
    const { hostingId } = req.params;
    const { status, adminNotes } = req.body;

    if (!["pending", "approved", "rejected", "completed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updateData = { status };
    if (adminNotes) {
      updateData.adminNotes = adminNotes;
    }

    // If approving, set activation date and expiry date (1 year from now for yearly, 1 month for monthly)
    if (status === "approved") {
      const hosting = await Hosting.findById(hostingId);
      if (hosting) {
        updateData.activationDate = new Date();
        
        // Set expiry based on plan duration
        if (hosting.planDuration === "Yearly") {
          updateData.expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year
        } else if (hosting.planDuration === "Monthly") {
          updateData.expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        }
      }
    }

    const hosting = await Hosting.findByIdAndUpdate(hostingId, updateData, {
      new: true,
      runValidators: true,
    }).populate("userId", "name email phone company");

    if (!hosting) {
      return res.status(404).json({
        success: false,
        message: "Hosting inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Hosting inquiry ${status} successfully`,
      hosting,
    });
  } catch (error) {
    console.error("Error updating hosting status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update hosting status",
      error: error.message,
    });
  }
};

// Delete hosting inquiry (Admin only)
exports.deleteHostingInquiry = async (req, res) => {
  try {
    const { hostingId } = req.params;

    const hosting = await Hosting.findByIdAndDelete(hostingId);

    if (!hosting) {
      return res.status(404).json({
        success: false,
        message: "Hosting inquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hosting inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting hosting inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete hosting inquiry",
      error: error.message,
    });
  }
};
