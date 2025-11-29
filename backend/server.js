const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import models for seeding
const NGO = require('./models/NGO');
const Donation = require('./models/Donation');

// Import routes
const donationRoutes = require('./routes/donationRoutes');
const ngoRoutes = require('./routes/ngoRoutes');
const statsRoutes = require('./routes/statsRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/donations', donationRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Zero-Waste FoodLink API is running!' });
});

// Error Handler
app.use(errorHandler);

// Database Connection & Auto-Seeding
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Auto-Seeding Logic
    const ngoCount = await NGO.countDocuments();
    if (ngoCount === 0) {
      console.log('Database appears empty. Seeding data...');

      const ngos = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data', 'ngos.json'), 'utf-8')
      );
      const donations = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data', 'donations.json'), 'utf-8')
      );

      await NGO.create(ngos);
      await Donation.create(donations);

      console.log('Data Imported Successfully!');
    } else {
      console.log('Database already has data. Skipping seed.');
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is in use. Please free up port ${PORT} or change it in .env`);
      process.exit(1);
    }
  });
};

startServer();

module.exports = app;