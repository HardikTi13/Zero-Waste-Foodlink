const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: [true, 'Please add a restaurant name'],
    trim: true
  },
  foodName: {
    type: String,
    required: [true, 'Please add food name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  quantity: {
    type: String,
    required: [true, 'Please add quantity']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image']
  },
  aiAnalysis: {
    freshnessScore: {
      type: Number,
      min: 1,
      max: 10
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1
    },
    estimatedHoursToExpire: {
      type: Number,
      required: false
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    }
  },
  expiresAt: {
    type: Date,
    required: true
  },
  isClaimed: {
    type: Boolean,
    default: false
  },
  claimedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'NGO',
    default: null
  },
  claimedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);