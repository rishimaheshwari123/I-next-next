const Advertisement = require('../models/Advertisement');
const { uploadImageToCloudinary } = require('../config/imageUploader');

// Create advertisement (Admin only)
exports.createAdvertisement = async (req, res) => {
  try {
    const { targetUrl } = req.body;

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image'
      });
    }

    // Upload image to cloudinary
    const result = await uploadImageToCloudinary(
      req.files.image, 
      'advertisements',
      null,
      null
    );

    const advertisement = await Advertisement.create({
      imageUrl: result.secure_url,
      targetUrl
    });

    res.status(201).json({
      success: true,
      message: 'Advertisement created successfully',
      advertisement
    });
  } catch (error) {
    console.error('Advertisement creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating advertisement',
      error: error.message
    });
  }
};

// Get all advertisements (Admin)
exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: advertisements.length,
      advertisements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching advertisements',
      error: error.message
    });
  }
};

// Get active advertisements (Public)
exports.getActiveAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find({ isActive: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: advertisements.length,
      advertisements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching advertisements',
      error: error.message
    });
  }
};

// Update advertisement (Admin only)
exports.updateAdvertisement = async (req, res) => {
  try {
    const { targetUrl, isActive } = req.body;
    const advertisement = await Advertisement.findById(req.params.id);

    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: 'Advertisement not found'
      });
    }

    if (targetUrl) advertisement.targetUrl = targetUrl;
    if (typeof isActive !== 'undefined') advertisement.isActive = isActive;

    // Update image if provided
    if (req.files && req.files.image) {
      const result = await uploadImageToCloudinary(
        req.files.image,
        'advertisements',
        null,
        null
      );
      advertisement.imageUrl = result.secure_url;
    }

    await advertisement.save();

    res.json({
      success: true,
      message: 'Advertisement updated successfully',
      advertisement
    });
  } catch (error) {
    console.error('Advertisement update error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating advertisement',
      error: error.message
    });
  }
};

// Delete advertisement (Admin only)
exports.deleteAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisement.findByIdAndDelete(req.params.id);

    if (!advertisement) {
      return res.status(404).json({
        success: false,
        message: 'Advertisement not found'
      });
    }

    res.json({
      success: true,
      message: 'Advertisement deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting advertisement',
      error: error.message
    });
  }
};
