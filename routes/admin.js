const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllMembers, getAllTrainers } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/members', getAllMembers);
router.get('/trainers', getAllTrainers);

module.exports = router;
