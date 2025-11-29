const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  restaurantId: {
    type: String,
    required: true,
  },
  restaurantName: {
    type: String,
    required: true,
  },
  foodItems: [{
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    expiryHours: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['vegetables', 'fruits', 'dairy', 'bakery', 'cooked_food', 'beverages', 'other'],
      required: true,
    },
    image: {
      type: String,
    },
  }],
  pickupLocation: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere',
    },
    address: String,
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked_up', 'expired'],
    default: 'available',
  },
  claimedBy: {
    ngoId: String,
    ngoName: String,
  },
  pickupTimeWindow: {
    start: Date,
    end: Date,
  },
  aiVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
donationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Donation', donationSchema);