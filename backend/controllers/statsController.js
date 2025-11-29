const Donation = require('../models/Donation');
const NGO = require('../models/NGO');

// @desc    Get stats overview
// @route   GET /api/stats/overview
// @access  Public
exports.getStats = async (req, res, next) => {
  try {
    const totalDonations = await Donation.countDocuments();
    const claimedDonations = await Donation.countDocuments({ isClaimed: true });
    const unclaimedDonations = await Donation.countDocuments({ isClaimed: false });
    const totalNGOs = await NGO.countDocuments();

    // Daily stats (donations created in last 7 days)
    const today = new Date();
    const sevenDaysAgo = new Date(today.setDate(today.getDate() - 7));

    const recentDonations = await Donation.find({
      createdAt: { $gte: sevenDaysAgo }
    });

    const dailyStats = {};
    recentDonations.forEach(donation => {
      const date = donation.createdAt.toISOString().split('T')[0];
      dailyStats[date] = (dailyStats[date] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: {
        totalDonations,
        claimedDonations,
        unclaimedDonations,
        totalNGOs,
        dailyStats
      }
    });
  } catch (err) {
    next(err);
  }
};