const Service = require("../models/serviceModel");

// Create Service
exports.createService = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { serviceName, description, category, variants } = req.body;

    // Validate required fields
    if (!serviceName || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    if (!variants || variants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one variant is required",
      });
    }

    // Validate variants
    for (let variant of variants) {
      if (!variant.name || !variant.amount) {
        return res.status(400).json({
          success: false,
          message: "Each variant must have a name and amount",
        });
      }
    }

    const service = await Service.create({
      serviceName,
      description,
      category,
      variants,
      createdBy: adminId,
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({
      success: false,
      message: "Error creating service",
      error: error.message,
    });
  }
};

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { serviceName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const services = await Service.find(query)
      .populate("category", "name")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching services",
      error: error.message,
    });
  }
};

// Get Service by ID
exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id)
      .populate("category", "name")
      .populate("createdBy", "name email");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching service",
      error: error.message,
    });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow updating createdBy
    delete updateData.createdBy;

    // Validate variants if provided
    if (updateData.variants && updateData.variants.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one variant is required",
      });
    }

    if (updateData.variants) {
      for (let variant of updateData.variants) {
        if (!variant.name || !variant.amount) {
          return res.status(400).json({
            success: false,
            message: "Each variant must have a name and amount",
          });
        }
      }
    }

    const service = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("category", "name")
      .populate("createdBy", "name email");

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({
      success: false,
      message: "Error updating service",
      error: error.message,
    });
  }
};

// Delete Service (soft delete)
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: service,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting service",
      error: error.message,
    });
  }
};

// Get Service Statistics
exports.getServiceStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments({ isActive: true });
    const servicesByCategory = await Service.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: { path: "$categoryInfo", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          categoryName: { $ifNull: ["$categoryInfo.name", "Unknown"] },
          count: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalServices,
        servicesByCategory,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};
