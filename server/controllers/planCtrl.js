const Plan = require("../models/planModel");
const Auth = require("../models/authModel");

// Create a new plan purchase
exports.createPlan = async (req, res) => {
  try {
    const { userId, serviceName, planType, planPrice, planFeatures } = req.body;

    // Validate required fields
    if (!userId || !serviceName || !planType || !planPrice) {
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

    // Create new plan
    const newPlan = await Plan.create({
      userId,
      serviceName,
      planType,
      planPrice,
      planFeatures: planFeatures || [],
      status: "inactive",
    });

    res.status(201).json({
      success: true,
      message: "Plan purchased successfully! Waiting for admin approval.",
      plan: newPlan,
    });
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create plan",
      error: error.message,
    });
  }
};

// Get all plans (Admin)
exports.getAllPlans = async (req, res) => {
  try {
    console.log("Fetching all plans...");
    
    const plans = await Plan.find()
      .populate("userId", "name email phone company")
      .sort({ createdAt: -1 })
      .lean();

    console.log(`Found ${plans.length} plans`);

    res.status(200).json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
      error: error.message,
    });
  }
};

// Get plans by user ID (Client)
exports.getPlansByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const plans = await Plan.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      plans,
    });
  } catch (error) {
    console.error("Error fetching user plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch plans",
      error: error.message,
    });
  }
};

// Update plan status (Admin only)
exports.updatePlanStatus = async (req, res) => {
  try {
    const { planId } = req.params;
    const { status } = req.body;

    if (!["inactive", "active", "expired"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updateData = { status };

    // If activating, set activation date and expiry date (30 days from now)
    if (status === "active") {
      updateData.activationDate = new Date();
      updateData.expiryDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    }

    const plan = await Plan.findByIdAndUpdate(planId, updateData, {
      new: true,
      runValidators: true,
    }).populate("userId", "name email phone company");

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Plan ${status} successfully`,
      plan,
    });
  } catch (error) {
    console.error("Error updating plan status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update plan status",
      error: error.message,
    });
  }
};

// Delete plan (Admin only)
exports.deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    const plan = await Plan.findByIdAndDelete(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete plan",
      error: error.message,
    });
  }
};
