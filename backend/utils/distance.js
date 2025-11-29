/**
 * Calculate the distance between two points using the Haversine formula
 * @param {Object} coord1 - First coordinate {lat, lng}
 * @param {Object} coord2 - Second coordinate {lat, lng}
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(coord2.lat - coord1.lat);
  const dLon = deg2rad(coord2.lng - coord1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(coord1.lat)) * Math.cos(deg2rad(coord2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in kilometers
  
  return distance;
};

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} Radians
 */
const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};

/**
 * Find nearby NGOs based on donation location
 * @param {Object} donationLocation - Donation location {lat, lng}
 * @param {Array} ngos - Array of NGO objects with location data
 * @param {number} maxDistance - Maximum distance in kilometers (default: 10km)
 * @returns {Array} Array of nearby NGOs sorted by distance
 */
const findNearbyNGOs = (donationLocation, ngos, maxDistance = 10) => {
  const nearbyNGOs = [];
  
  for (const ngo of ngos) {
    if (ngo.location && ngo.location.coordinates) {
      // Extract coordinates [longitude, latitude]
      const ngoLocation = {
        lat: ngo.location.coordinates[1],
        lng: ngo.location.coordinates[0]
      };
      
      const distance = calculateDistance(donationLocation, ngoLocation);
      
      if (distance <= maxDistance) {
        nearbyNGOs.push({
          ...ngo.toObject ? ngo.toObject() : ngo,
          distance: parseFloat(distance.toFixed(2))
        });
      }
    }
  }
  
  // Sort by distance (closest first)
  nearbyNGOs.sort((a, b) => a.distance - b.distance);
  
  return nearbyNGOs;
};

module.exports = {
  calculateDistance,
  findNearbyNGOs
};