const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    default: 'month'
  },
  description: {
    type: String,
    required: true
  },
  features: [String],
  highlighted: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Membership', membershipSchema);
