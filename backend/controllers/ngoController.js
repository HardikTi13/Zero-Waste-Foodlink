const NGO = require('../models/NGO');
const { registerNgoValidation } = require('../utils/validators');

// @desc    Get all NGOs
// @route   GET /api/ngos
// @access  Public
exports.getNgos = async (req, res, next) => {
  try {
    const ngos = await NGO.find();
    res.status(200).json({
      success: true,
      count: ngos.length,
      data: ngos
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new NGO
// @route   POST /api/ngos
// @access  Public
exports.createNgo = async (req, res, next) => {
  try {
    const { error } = registerNgoValidation(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.details[0].message });
    }

    const { name, email, phone, latitude, longitude } = req.body;

    const ngo = await NGO.create({
      name,
      email,
      phone,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)]
      }
    });

    res.status(201).json({
      success: true,
      data: ngo
    });
  } catch (err) {
    next(err);
  }
};