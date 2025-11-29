const express = require('express');
const router = express.Router();
const { createDonation, getDonations, getDonation, updateDonationStatus, deleteDonation } = require('../controllers/donationController');
const upload = require('../middleware/upload');

// Route: /api/donations

// Create a new donation with image upload
router.post('/', upload.array('images', 5), createDonation);

// Get all donations
router.get('/', getDonations);

// Get single donation
router.get('/:id', getDonation);

// Update donation status
router.put('/:id/status', updateDonationStatus);

// Delete donation
router.delete('/:id', deleteDonation);

module.exports = router;