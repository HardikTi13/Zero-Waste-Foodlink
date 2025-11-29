const express = require('express');
const router = express.Router();
const {
    createDonation,
    getNearbyDonations,
    claimDonation,
    analyzeImageForForm,
    getDonations
} = require('../controllers/donationController');
const upload = require('../middleware/upload');

router.post('/', upload.single('image'), createDonation);
router.get('/', getDonations);
router.post('/analyze', upload.single('image'), analyzeImageForForm);
router.get('/nearby', getNearbyDonations);
router.post('/:id/claim', claimDonation);

module.exports = router;