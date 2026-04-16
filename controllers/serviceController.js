const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({ active: true });
    res.status(200).json({ success: true, count: services.length, services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.status(200).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.status(200).json({ success: true, message: 'Service deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
