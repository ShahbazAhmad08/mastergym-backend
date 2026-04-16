const Member = require('../models/Member');
const Trainer = require('../models/Trainer');
const Membership = require('../models/Membership');
const Service = require('../models/Service');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({ status: 'Active' });
    const totalTrainers = await Trainer.countDocuments();
    const availableTrainers = await Trainer.countDocuments({ availability: 'Available' });
    const memberships = await Membership.find({ active: true });
    const services = await Service.find({ active: true });

    // Calculate monthly revenue
    const members = await Member.find({ status: 'Active' });
    const priceMap = { Basic: 29, Premium: 59, Elite: 99 };
    const monthlyRevenue = members.reduce((sum, member) => sum + (priceMap[member.membershipPlan] || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalMembers,
        activeMembers,
        totalTrainers,
        availableTrainers,
        monthlyRevenue,
        totalMemberships: memberships.length,
        totalServices: services.length
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('assignedTrainer', 'name');
    res.status(200).json({ success: true, count: members.length, members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({ success: true, count: trainers.length, trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
