const Donation = require('../models/Donation');
const NGO = require('../models/NGO');

/**
 * Get platform statistics
 * @route GET /api/stats
 * @access Public
 */
const getStats = async (req, res, next) => {
  try {
    // Get total donations
    const totalDonations = await Donation.countDocuments();
    
    // Get total NGOs
    const totalNGOs = await NGO.countDocuments();
    
    // Get active donations
    const activeDonations = await Donation.countDocuments({ status: 'available' });
    
    // Get claimed donations
    const claimedDonations = await Donation.countDocuments({ status: 'claimed' });
    
    // Get picked up donations
    const pickedUpDonations = await Donation.countDocuments({ status: 'picked_up' });
    
    // Get expired donations
    const expiredDonations = await Donation.countDocuments({ status: 'expired' });
    
    // Get verified NGOs
    const verifiedNGOs = await NGO.countDocuments({ verified: true });
    
    // Get active NGOs
    const activeNGOs = await NGO.countDocuments({ active: true });
    
    // Get total food items donated
    const donationsWithItems = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalItems: { $sum: { $size: '$foodItems' } }
        }
      }
    ]);
    
    const totalFoodItems = donationsWithItems.length > 0 ? donationsWithItems[0].totalItems : 0;
    
    // Get donations by category
    const donationsByCategory = await Donation.aggregate([
      { $unwind: '$foodItems' },
      {
        $group: {
          _id: '$foodItems.category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    // Get recent donations (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentDonations = await Donation.find({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const donationsLast30Days = recentDonations.length;
    
    // Calculate estimated food saved (in kg equivalent)
    let estimatedFoodSaved = 0;
    for (const donation of recentDonations) {
      for (const item of donation.foodItems) {
        // Simple conversion: assume 1 unit = 1 kg for estimation
        estimatedFoodSaved += item.quantity;
      }
    }
    
    res.status(200).json({
      success: true,
      data: {
        donations: {
          total: totalDonations,
          active: activeDonations,
          claimed: claimedDonations,
          pickedUp: pickedUpDonations,
          expired: expiredDonations,
          last30Days: donationsLast30Days
        },
        ngos: {
          total: totalNGOs,
          verified: verifiedNGOs,
          active: activeNGOs
        },
        impact: {
          totalFoodItems,
          estimatedFoodSavedKg: Math.round(estimatedFoodSaved),
          donationsByCategory
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get NGO-specific statistics
 * @route GET /api/stats/ngo/:id
 * @access Public
 */
const getNGOStats = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Check if NGO exists
    const ngo = await NGO.findById(id);
    if (!ngo) {
      return res.status(404).json({
        success: false,
        error: 'NGO not found'
      });
    }
    
    // Get total donations received by this NGO
    const totalDonationsReceived = await Donation.countDocuments({
      'claimedBy.ngoId': id
    });
    
    // Get recent donations received (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentDonations = await Donation.find({
      'claimedBy.ngoId': id,
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const recentDonationsCount = recentDonations.length;
    
    // Calculate estimated food received (in kg equivalent)
    let estimatedFoodReceived = 0;
    for (const donation of recentDonations) {
      for (const item of donation.foodItems) {
        // Simple conversion: assume 1 unit = 1 kg for estimation
        estimatedFoodReceived += item.quantity;
      }
    }
    
    // Get donations by category for this NGO
    const donationsByCategory = await Donation.aggregate([
      { $match: { 'claimedBy.ngoId': id } },
      { $unwind: '$foodItems' },
      {
        $group: {
          _id: '$foodItems.category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        ngo: {
          id: ngo._id,
          name: ngo.name
        },
        donations: {
          totalReceived: totalDonationsReceived,
          recent30Days: recentDonationsCount
        },
        impact: {
          estimatedFoodReceivedKg: Math.round(estimatedFoodReceived),
          donationsByCategory
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getNGOStats
};