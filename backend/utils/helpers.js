/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Format food item for AI processing
 * @param {Object} foodItem - Food item object
 * @returns {string} Formatted string for AI processing
 */
const formatFoodItemForAI = (foodItem) => {
  return `${foodItem.name}, Quantity: ${foodItem.quantity} ${foodItem.unit}, Category: ${foodItem.category}`;
};

/**
 * Format donation data for response
 * @param {Object} donation - Donation object
 * @returns {Object} Formatted donation object
 */
const formatDonationResponse = (donation) => {
  return {
    id: donation._id,
    restaurantId: donation.restaurantId,
    restaurantName: donation.restaurantName,
    foodItems: donation.foodItems,
    pickupLocation: donation.pickupLocation,
    status: donation.status,
    claimedBy: donation.claimedBy,
    pickupTimeWindow: donation.pickupTimeWindow,
    aiVerified: donation.aiVerified,
    createdAt: donation.createdAt,
    updatedAt: donation.updatedAt
  };
};

/**
 * Format NGO data for response
 * @param {Object} ngo - NGO object
 * @returns {Object} Formatted NGO object
 */
const formatNGOResponse = (ngo) => {
  return {
    id: ngo._id,
    name: ngo.name,
    email: ngo.email,
    phone: ngo.phone,
    address: ngo.address,
    location: ngo.location,
    capacity: ngo.capacity,
    foodPreferences: ngo.foodPreferences,
    verified: ngo.verified,
    active: ngo.active,
    totalDonationsReceived: ngo.totalDonationsReceived,
    createdAt: ngo.createdAt,
    updatedAt: ngo.updatedAt
  };
};

/**
 * Validate time window
 * @param {Date} startTime - Start time
 * @param {Date} endTime - End time
 * @returns {boolean} Whether the time window is valid
 */
const isValidTimeWindow = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  
  // Check if start time is in the future
  if (start < now) {
    return false;
  }
  
  // Check if end time is after start time
  if (end <= start) {
    return false;
  }
  
  // Check if time window is not longer than 24 hours
  const diffInHours = (end - start) / (1000 * 60 * 60);
  if (diffInHours > 24) {
    return false;
  }
  
  return true;
};

module.exports = {
  generateUniqueId,
  formatFoodItemForAI,
  formatDonationResponse,
  formatNGOResponse,
  isValidTimeWindow
};