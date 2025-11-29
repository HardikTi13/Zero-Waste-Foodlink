const Donation = require('../models/Donation');
const NGO = require('../models/NGO');
const { analyzeFoodImage } = require('../services/gemini');
const { uploadImageToCloudinary } = require('../services/imageUpload');
const { matchDonationWithNGOs, getAIRecommendedNGO, prioritizeNGOs } = require('../services/matching');
const { formatDonationResponse, generateUniqueId } = require('../utils/helpers');
const path = require('path');

/**
 * Create a new donation
 * @route POST /api/donations
 * @access Private (Restaurant)
 */
const createDonation = async (req, res, next) => {
  try {
    const { restaurantId, restaurantName, pickupLocation, pickupTimeWindow } = req.body;
    
    // Validate required fields
    if (!restaurantId || !restaurantName || !pickupLocation || !pickupTimeWindow) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Process food items
    let foodItems = [];
    
    if (req.files && req.files.length > 0) {
      // Process each uploaded image
      for (const file of req.files) {
        // Analyze food image using AI
        const foodData = await analyzeFoodImage(file.path);
        
        // Upload image to Cloudinary
        const uploadResult = await uploadImageToCloudinary(file.path);
        
        // Add food item with AI data and image URL
        foodItems.push({
          ...foodData,
          image: uploadResult.url
        });
      }
    } else if (req.body.foodItems) {
      // Use provided food items data
      foodItems = JSON.parse(req.body.foodItems);
    }
    
    // Validate food items
    if (foodItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one food item is required'
      });
    }
    
    // Create donation object
    const donationData = {
      restaurantId,
      restaurantName,
      foodItems,
      pickupLocation,
      pickupTimeWindow,
      aiVerified: true
    };
    
    // Create donation in database
    const donation = new Donation(donationData);
    await donation.save();
    
    // Get all active NGOs
    const ngos = await NGO.find({ active: true });
    
    // Match donation with NGOs
    const matchingNGOs = matchDonationWithNGOs(donation, ngos);
    
    // Prioritize NGOs
    const prioritizedNGOs = prioritizeNGOs(donation, ngos);
    
    // Get AI recommendation
    const recommendedNGO = await getAIRecommendedNGO(donation, ngos);
    
    res.status(201).json({
      success: true,
      data: {
        donation: formatDonationResponse(donation),
        matchingNGOs: prioritizedNGOs.slice(0, 5), // Top 5 matches
        recommendedNGO: recommendedNGO ? {
          id: recommendedNGO._id,
          name: recommendedNGO.name,
          distance: recommendedNGO.distance
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all donations
 * @route GET /api/donations
 * @access Public
 */
const getDonations = async (req, res, next) => {
  try {
    const { status, restaurantId, ngoId } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (restaurantId) {
      filter.restaurantId = restaurantId;
    }
    
    if (ngoId) {
      filter['claimedBy.ngoId'] = ngoId;
    }
    
    // Get donations from database
    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 });
    
    // Format donations for response
    const formattedDonations = donations.map(donation => 
      formatDonationResponse(donation)
    );
    
    res.status(200).json({
      success: true,
      count: formattedDonations.length,
      data: formattedDonations
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single donation
 * @route GET /api/donations/:id
 * @access Public
 */
const getDonation = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Get donation from database
    const donation = await Donation.findById(id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found'
      });
    }
    
    // Get all active NGOs for matching
    const ngos = await NGO.find({ active: true });
    
    // Match donation with NGOs
    const matchingNGOs = matchDonationWithNGOs(donation, ngos);
    
    // Prioritize NGOs
    const prioritizedNGOs = prioritizeNGOs(donation, ngos);
    
    res.status(200).json({
      success: true,
      data: {
        donation: formatDonationResponse(donation),
        matchingNGOs: prioritizedNGOs.slice(0, 5) // Top 5 matches
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update donation status
 * @route PUT /api/donations/:id/status
 * @access Private
 */
const updateDonationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, ngoId, ngoName } = req.body;
    
    // Validate status
    const validStatuses = ['available', 'claimed', 'picked_up', 'expired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }
    
    // Build update object
    const updateData = { status };
    
    if (status === 'claimed' && ngoId && ngoName) {
      updateData.claimedBy = { ngoId, ngoName };
    }
    
    // Update donation in database
    const donation = await Donation.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found'
      });
    }
    
    // If donation was claimed, update NGO's total donations received
    if (status === 'claimed' && ngoId) {
      await NGO.findByIdAndUpdate(
        ngoId,
        { $inc: { totalDonationsReceived: 1 } },
        { new: true, runValidators: true }
      );
    }
    
    res.status(200).json({
      success: true,
      data: formatDonationResponse(donation)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete donation
 * @route DELETE /api/donations/:id
 * @access Private (Restaurant)
 */
const deleteDonation = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Delete donation from database
    const donation = await Donation.findByIdAndDelete(id);
    
    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonation,
  updateDonationStatus,
  deleteDonation
};