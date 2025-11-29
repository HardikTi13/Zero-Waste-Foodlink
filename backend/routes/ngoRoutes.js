const express = require('express');
const router = express.Router();
const { registerNGO, loginNGO, getNGOs, getNGO, updateNGO, deleteNGO } = require('../controllers/ngoController');

// Route: /api/ngos

// Register a new NGO
router.post('/register', registerNGO);

// Login NGO
router.post('/login', loginNGO);

// Get all NGOs
router.get('/', getNGOs);

// Get single NGO
router.get('/:id', getNGO);

// Update NGO profile
router.put('/:id', updateNGO);

// Delete NGO
router.delete('/:id', deleteNGO);

module.exports = router;