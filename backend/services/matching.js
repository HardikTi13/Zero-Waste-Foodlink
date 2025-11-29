// TODO: Implement advanced matching logic (Gemini-driven NGO ranking)
// For now, this is a placeholder.

const findBestMatches = async (donation, ngos) => {
  // Simple distance-based sorting is handled by MongoDB $near query in controller.
  return ngos;
};

module.exports = { findBestMatches };