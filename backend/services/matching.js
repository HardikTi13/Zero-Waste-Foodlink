const { findNearbyNGOs } = require('../utils/distance');
const { recommendBestNGO } = require('./gemini');

/**
 * Match donation with nearby NGOs
 * @param {Object} donation - Donation object
 * @param {Array} ngos - Array of NGO objects
 * @param {number} maxDistance - Maximum distance in kilometers (default: 10km)
 * @returns {Array} Array of matching NGOs
 */
const matchDonationWithNGOs = (donation, ngos, maxDistance = 10) => {
  try {
    // Extract donation location
    const donationLocation = {
      lat: donation.pickupLocation.coordinates[1],
      lng: donation.pickupLocation.coordinates[0]
    };
    
    // Find nearby NGOs
    const nearbyNGOs = findNearbyNGOs(donationLocation, ngos, maxDistance);
    
    // Filter NGOs based on food preferences
    const matchingNGOs = nearbyNGOs.filter(ngo => {
      // Check if NGO has food preferences
      if (!ngo.foodPreferences || ngo.foodPreferences.length === 0) {
        return true; // No preferences, accept all food types
      }
      
      // Check if any food item category matches NGO preferences
      return donation.foodItems.some(item => 
        ngo.foodPreferences.includes(item.category)
      );
    });
    
    return matchingNGOs;
  } catch (error) {
    console.error('Error matching donation with NGOs:', error);
    throw new Error('Failed to match donation with NGOs');
  }
};

/**
 * Get best NGO recommendation using AI
 * @param {Object} donation - Donation object
 * @param {Array} ngos - Array of NGO objects
 * @returns {Promise<Object>} Recommended NGO
 */
const getAIRecommendedNGO = async (donation, ngos) => {
  try {
    // First, match donation with NGOs based on location and preferences
    const matchingNGOs = matchDonationWithNGOs(donation, ngos);
    
    if (matchingNGOs.length === 0) {
      return null;
    }
    
    // If only one matching NGO, return it
    if (matchingNGOs.length === 1) {
      return matchingNGOs[0];
    }
    
    // Use AI to recommend the best NGO
    const recommendedNGO = await recommendBestNGO(donation, matchingNGOs);
    return recommendedNGO;
  } catch (error) {
    console.error('Error getting AI recommended NGO:', error);
    throw new Error('Failed to get AI recommended NGO');
  }
};

/**
 * Prioritize NGOs based on multiple factors
 * @param {Object} donation - Donation object
 * @param {Array} ngos - Array of NGO objects
 * @returns {Array} Array of prioritized NGOs
 */
const prioritizeNGOs = (donation, ngos) => {
  try {
    // First, match donation with NGOs based on location and preferences
    const matchingNGOs = matchDonationWithNGOs(donation, ngos);
    
    // Add priority score to each NGO
    const ngosWithPriority = matchingNGOs.map(ngo => {
      let priorityScore = 0;
      
      // Factor 1: Proximity (closer is better)
      priorityScore += Math.max(0, 100 - (ngo.distance * 10));
      
      // Factor 2: Food preferences match
      const matchingPreferences = donation.foodItems.filter(item => 
        ngo.foodPreferences.includes(item.category)
      ).length;
      priorityScore += matchingPreferences * 20;
      
      // Factor 3: NGO capacity (higher capacity is better)
      priorityScore += ngo.capacity / 10;
      
      // Factor 4: History of receiving donations (more is better)
      priorityScore += ngo.totalDonationsReceived / 5;
      
      return {
        ...ngo,
        priorityScore: Math.round(priorityScore)
      };
    });
    
    // Sort by priority score (highest first)
    ngosWithPriority.sort((a, b) => b.priorityScore - a.priorityScore);
    
    return ngosWithPriority;
  } catch (error) {
    console.error('Error prioritizing NGOs:', error);
    throw new Error('Failed to prioritize NGOs');
  }
};

module.exports = {
  matchDonationWithNGOs,
  getAIRecommendedNGO,
  prioritizeNGOs
};