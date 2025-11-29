const Donation = require('../models/Donation');
const { uploadImage } = require('../services/imageUpload');
const { analyzeImage } = require('../services/gemini');
const { createDonationValidation } = require('../utils/validators');
const fs = require('fs');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Public
exports.createDonation = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload an image' });
    }

    // Validate text fields
    const { error } = createDonationValidation(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }

    // Analyze image
    const analysis = await analyzeImage(req.file.path);

    // Upload image to cloud/storage (assuming uploadImage returns object with url)
    const uploadedImage = await uploadImage(req.file.path);

    // Calculate expiration
    let expiresAt;
    if (req.body.expiresAt) {
      expiresAt = new Date(req.body.expiresAt);
    } else {
      // Default to 24 hours if not provided by AI or user
      const hoursToAdd = analysis.estimatedHoursToExpire || 24;
      expiresAt = new Date(Date.now() + hoursToAdd * 60 * 60 * 1000);
    }

    const donation = await Donation.create({
      restaurantName: req.body.restaurantName || 'Anonymous', // Fallback if not in body
      foodName: analysis.foodName || req.body.foodName,
      description: analysis.description || req.body.description,
      quantity: analysis.estimatedQuantity || req.body.quantity,
      imageUrl: uploadedImage.url,
      aiAnalysis: {
        freshnessScore: analysis.freshnessScore,
        confidence: analysis.confidence,
        estimatedHoursToExpire: analysis.estimatedHoursToExpire
      },
      location: {
        type: 'Point',
        coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
      },
      expiresAt,
      isClaimed: false
    });

    // Clean up temp file
    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {
      console.error('Error deleting temp file:', e);
    }

    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all donations (for restaurant dashboard)
// @route   GET /api/donations
// @access  Public
exports.getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get nearby donations
// @route   GET /api/donations/nearby
// @access  Public
exports.getNearbyDonations = async (req, res, next) => {
  try {
    const { lat, lon, radius } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ success: false, error: 'Please provide lat and lon' });
    }

    const distanceInMeters = (radius || 5) * 1000; // Default 5km

    const donations = await Donation.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lon), parseFloat(lat)]
          },
          $maxDistance: distanceInMeters
        }
      },
      isClaimed: false,
      expiresAt: { $gt: new Date() }
    });

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Claim a donation
// @route   POST /api/donations/:id/claim
// @access  Public
exports.claimDonation = async (req, res, next) => {
  try {
    const { ngoId } = req.body;

    if (!ngoId) {
      return res.status(400).json({ success: false, error: 'NGO ID is required' });
    }

    const donation = await Donation.findOneAndUpdate(
      { _id: req.params.id, isClaimed: false },
      {
        $set: {
          isClaimed: true,
          claimedBy: ngoId,
          claimedAt: new Date()
        }
      },
      { new: true }
    );

    if (!donation) {
      return res.status(409).json({ success: false, error: 'Donation already claimed or not found' });
    }

    res.status(200).json({
      success: true,
      data: donation
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Analyze image for donation form
// @route   POST /api/donations/analyze
// @access  Public
exports.analyzeImageForForm = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload an image' });
    }

    // Analyze image
    const analysis = await analyzeImage(req.file.path);

    // Clean up temp file
    try {
      fs.unlinkSync(req.file.path);
    } catch (e) {
      console.error('Error deleting temp file:', e);
    }

    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (err) {
    next(err);
  }
};