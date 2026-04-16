const express = require('express');
const router = express.Router();
const { getMemberships, createMembership, updateMembership, deleteMembership } = require('../controllers/membershipController');

router.route('/').get(getMemberships).post(createMembership);
router.route('/:id').put(updateMembership).delete(deleteMembership);

module.exports = router;
