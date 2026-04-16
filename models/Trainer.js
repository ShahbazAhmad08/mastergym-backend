const mongoose = require("mongoose");

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  certifications: [String],
  bio: {
    type: String,
    required: true,
  },
  avatar: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  availability: {
    type: String,
    enum: ["Available", "Busy", "On Leave"],
    default: "Available",
  },
  assignedMembers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Trainer", trainerSchema);
