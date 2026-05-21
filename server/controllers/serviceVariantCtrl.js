const ServiceVariant = require("../models/serviceVariantModel");
const Service = require("../models/serviceModel");

// Create Service Variant
exports.createVariant = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { variantName, description, pages, features, timeline, amount } =
      req.body;

    // Validate required fields
    if (!variantName || !description || !timeline || !amount) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const variant = await ServiceVariant.create({
      serviceId,
      variantName,
      description,
      pages: pages || 1,
      features: features || [],
      timeline,
      amount,
    });

    // Add variant to service
    await Service.findByIdAndUpdate(serviceId, {
      $push: { variants: variant._id },
    });

    res.status(201).json({
      success: true,
      message: "Variant created successfully",
      data: variant,
    });
  } catch (error) {
    console.error("Error creating variant:", error);
    res.status(500).json({
      success: false,
      message: "Error creating variant",
      error: error.message,
    });
  }
};

// Get All Variants for a Service
exports.getVariantsByService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const variants = await ServiceVariant.find({
      serviceId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: variants.length,
      data: variants,
    });
  } catch (error) {
    console.error("Error fetching variants:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching variants",
      error: error.message,
    });
  }
};

// Get Variant by ID
exports.getVariantById = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await ServiceVariant.findById(id);

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: variant,
    });
  } catch (error) {
    console.error("Error fetching variant:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching variant",
      error: error.message,
    });
  }
};

// Update Variant
exports.updateVariant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const variant = await ServiceVariant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Variant updated successfully",
      data: variant,
    });
  } catch (error) {
    console.error("Error updating variant:", error);
    res.status(500).json({
      success: false,
      message: "Error updating variant",
      error: error.message,
    });
  }
};

// Delete Variant (soft delete)
exports.deleteVariant = async (req, res) => {
  try {
    const { id } = req.params;

    const variant = await ServiceVariant.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }

    // Remove variant from service
    await Service.findByIdAndUpdate(variant.serviceId, {
      $pull: { variants: id },
    });

    res.status(200).json({
      success: true,
      message: "Variant deleted successfully",
      data: variant,
    });
  } catch (error) {
    console.error("Error deleting variant:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting variant",
      error: error.message,
    });
  }
};
