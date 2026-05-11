const mongoose = require('mongoose');

const advertisementSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  targetUrl: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Advertisement', advertisementSchema);
