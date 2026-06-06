const Plan = require("../models/planModel");
const PlanPurchase = require("../models/planPurchaseModel");
const Auth = require("../models/authModel");

// --- Plan Template Controllers (Admin) ---

// Create a new plan template
exports.createPlanTemplate = async (req, res) => {
  try {
    const { name, description, category, priceRange, durationDays, benefits, keyFeatures, additionalFeatures } = req.body;

    if (!name || !category || !priceRange || !durationDays) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, category, priceRange, durationDays)",
      });
    }

    const newPlan = await Plan.create({
      name,
      description,
      category,
      priceRange,
      durationDays,
      benefits: benefits || [],
      keyFeatures: keyFeatures || [],
      additionalFeatures,
    });

    res.status(201).json({
      success: true,
      message: "Plan template created successfully",
      data: newPlan,
    });
  } catch (error) {
    console.error("Error creating plan template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create plan template",
      error: error.message,
    });
  }
};

// Get all plan templates
exports.getAllPlanTemplates = async (req, res) => {
  try {
    const plans = await Plan.find().populate("category", "name").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching plan templates:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch plan templates",
      error: error.message,
    });
  }
};

// Update plan template
exports.updatePlanTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const plan = await Plan.findByIdAndUpdate(id, updateData, { new: true });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan template not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan template updated successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Error updating plan template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update plan template",
      error: error.message,
    });
  }
};

// Delete plan template
exports.deletePlanTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan template not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Plan template deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting plan template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete plan template",
      error: error.message,
    });
  }
};

// --- Plan Purchase Controllers ---

// Purchase a plan (Client)
exports.purchasePlan = async (req, res) => {
  try {
    const { userId, planId, paymentMethod = "Cash" } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Plan ID are required",
      });
    }

    // Check if plan exists
    const planTemplate = await Plan.findById(planId);
    if (!planTemplate) {
      return res.status(404).json({
        success: false,
        message: "Plan template not found",
      });
    }

    const purchase = await PlanPurchase.create({
      userId,
      planId,
      paymentMethod,
      status: "pending",
    });

    res.status(201).json({
      success: true,
      message: "Plan purchase initiated. Waiting for admin approval.",
      data: purchase,
    });
  } catch (error) {
    console.error("Error purchasing plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate plan purchase",
      error: error.message,
    });
  }
};

// Get all purchases (Admin)
exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await PlanPurchase.find()
      .populate("userId", "name email phone company")
      .populate({
        path: "planId",
        populate: { path: "category", select: "name" }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: purchases.length,
      purchases,
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchases",
      error: error.message,
    });
  }
};

// Update purchase status (Admin)
exports.updatePurchaseStatus = async (req, res) => {
  try {
    const { purchaseId } = req.params;
    const { status, adminNotes } = req.body;

    if (!["pending", "active", "expired", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const purchase = await PlanPurchase.findById(purchaseId).populate("planId");
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase record not found",
      });
    }

    const updateData = { status, adminNotes };

    if (status === "active" && purchase.status !== "active") {
      const durationDays = purchase.planId.durationDays || 30;
      updateData.activationDate = new Date();
      updateData.expiryDate = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    }

    const updatedPurchase = await PlanPurchase.findByIdAndUpdate(purchaseId, updateData, { new: true })
      .populate("userId", "name email")
      .populate("planId");

    res.status(200).json({
      success: true,
      message: `Purchase status updated to ${status}`,
      purchase: updatedPurchase,
    });
  } catch (error) {
    console.error("Error updating purchase status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update purchase status",
      error: error.message,
    });
  }
};

// Get user purchases (Client)
exports.getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    const purchases = await PlanPurchase.find({ userId })
      .populate({
        path: "planId",
        populate: { path: "category", select: "name" }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: purchases.length,
      purchases,
    });
  } catch (error) {
    console.error("Error fetching user purchases:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchases",
      error: error.message,
    });
  }
};

// Get single purchase by ID
exports.getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await PlanPurchase.findById(id)
      .populate({
        path: "planId",
        populate: { path: "category", select: "name" }
      })
      .populate("userId", "name email phone company");

    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: "Purchase record not found",
      });
    }

    res.status(200).json({
      success: true,
      purchase,
    });
  } catch (error) {
    console.error("Error fetching purchase by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch purchase details",
      error: error.message,
    });
  }
};

// Delete purchase (Admin)
exports.deletePurchase = async (req, res) => {
  try {
    const { purchaseId } = req.params;
    await PlanPurchase.findByIdAndDelete(purchaseId);
    res.status(200).json({
      success: true,
      message: "Purchase record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting purchase:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete purchase record",
      error: error.message,
    });
  }
};
