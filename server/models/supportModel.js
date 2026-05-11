const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Message is required']
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  }
}, {
  timestamps: true
});

// Generate ticket number before saving
supportSchema.pre('save', async function(next) {
  if (this.isNew && !this.ticketNumber) {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    
    // Find the last ticket of the day
    const Support = this.constructor;
    const lastTicket = await Support.findOne({
      ticketNumber: new RegExp(`^TICK-${dateStr}`)
    }).sort({ ticketNumber: -1 });

    let sequence = 1;
    if (lastTicket) {
      const lastSequence = parseInt(lastTicket.ticketNumber.split('-')[2]);
      sequence = lastSequence + 1;
    }

    this.ticketNumber = `TICK-${dateStr}-${sequence.toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Support', supportSchema);
