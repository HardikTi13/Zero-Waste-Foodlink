const express = require('express');
const router = express.Router();
const { getStats, getNGOStats } = require('../controllers/statsController');

// Route: /api/stats

// Get platform statistics
router.get('/', getStats);

// Get NGO-specific statistics
router.get('/ngo/:id', getNGOStats);

module.exports = router;