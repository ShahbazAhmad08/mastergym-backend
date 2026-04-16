const Membership = require('../models/Membership');

exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find({ active: true });
    res.status(200).json({ success: true, count: memberships.length, memberships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json({ success: true, membership });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!membership) return res.status(404).json({ success: false, message: 'Membership not found' });
    res.status(200).json({ success: true, membership });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!membership) return res.status(404).json({ success: false, message: 'Membership not found' });
    res.status(200).json({ success: true, message: 'Membership deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
