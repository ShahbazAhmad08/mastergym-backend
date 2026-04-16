const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  membershipPlan: {
    type: String,
    enum: ['Basic', 'Premium', 'Elite'],
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Expired', 'Pending', 'Cancelled'],
    default: 'Active'
  },
  emergencyContact: {
    name: String,
    phone: String
  },
  assignedTrainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer'
  },
  payments: [{
    amount: Number,
    date: {
      type: Date,
      default: Date.now
    },
    method: String,
    status: {
      type: String,
      enum: ['Paid', 'Pending', 'Failed'],
      default: 'Paid'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Member', memberSchema);
