const Trainer = require('../models/Trainer');

exports.getTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json({ success: true, count: trainers.length, trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer not found' });
    res.status(200).json({ success: true, trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.create(req.body);
    res.status(201).json({ success: true, trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer not found' });
    res.status(200).json({ success: true, trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndDelete(req.params.id);
    if (!trainer) return res.status(404).json({ success: false, message: 'Trainer not found' });
    res.status(200).json({ success: true, message: 'Trainer deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
