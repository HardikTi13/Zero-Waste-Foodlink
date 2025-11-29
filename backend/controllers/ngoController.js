const NGO = require('../models/NGO');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { formatNGOResponse } = require('../utils/helpers');

/**
 * Register a new NGO
 * @route POST /api/ngos/register
 * @access Public
 */
const registerNGO = async (req, res, next) => {
  try {
    const { name, email, password, phone, address, location, capacity, foodPreferences } = req.body;
    
    // Validate required fields
    if (!name || !email || !password || !phone || !capacity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Check if NGO already exists
    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      return res.status(400).json({
        success: false,
        error: 'NGO with this email already exists'
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create NGO object
    const ngoData = {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      location,
      capacity,
      foodPreferences: foodPreferences || []
    };
    
    // Create NGO in database
    const ngo = new NGO(ngoData);
    await ngo.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: ngo._id, email: ngo.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      data: formatNGOResponse(ngo)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login NGO
 * @route POST /api/ngos/login
 * @access Public
 */
const loginNGO = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }
    
    // Check if NGO exists
    const ngo = await NGO.findOne({ email }).select('+password');
    if (!ngo) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check if password matches
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: ngo._id, email: ngo.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    
    res.status(200).json({
      success: true,
      token,
      data: formatNGOResponse(ngo)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all NGOs
 * @route GET /api/ngos
 * @access Public
 */
const getNGOs = async (req, res, next) => {
  try {
    const { active, verified } = req.query;
    
    // Build filter object
    let filter = {};
    
    if (active !== undefined) {
      filter.active = active === 'true';
    }
    
    if (verified !== undefined) {
      filter.verified = verified === 'true';
    }
    
    // Get NGOs from database
    const ngos = await NGO.find(filter);
    
    // Format NGOs for response
    const formattedNGOs = ngos.map(ngo => 
      formatNGOResponse(ngo)
    );
    
    res.status(200).json({
      success: true,
      count: formattedNGOs.length,
      data: formattedNGOs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single NGO
 * @route GET /api/ngos/:id
 * @access Public
 */
const getNGO = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Get NGO from database
    const ngo = await NGO.findById(id);
    
    if (!ngo) {
      return res.status(404).json({
        success: false,
        error: 'NGO not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: formatNGOResponse(ngo)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update NGO profile
 * @route PUT /api/ngos/:id
 * @access Private (NGO)
 */
const updateNGO = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, phone, address, location, capacity, foodPreferences, active } = req.body;
    
    // Build update object
    const updateData = {};
    
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (location) updateData.location = location;
    if (capacity) updateData.capacity = capacity;
    if (foodPreferences) updateData.foodPreferences = foodPreferences;
    if (active !== undefined) updateData.active = active;
    
    // Update NGO in database
    const ngo = await NGO.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!ngo) {
      return res.status(404).json({
        success: false,
        error: 'NGO not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: formatNGOResponse(ngo)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete NGO
 * @route DELETE /api/ngos/:id
 * @access Private (NGO/Admin)
 */
const deleteNGO = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Delete NGO from database
    const ngo = await NGO.findByIdAndDelete(id);
    
    if (!ngo) {
      return res.status(404).json({
        success: false,
        error: 'NGO not found'
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
  registerNGO,
  loginNGO,
  getNGOs,
  getNGO,
  updateNGO,
  deleteNGO
};