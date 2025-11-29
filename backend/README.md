# Zero-Waste FoodLink Backend

This is the backend API for the Zero-Waste FoodLink platform, an AI-powered food sharing platform that connects restaurants with nearby NGOs to reduce food waste.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Setup](#setup)
- [Environment Variables](#environment-variables)

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- Google Gemini AI
- Cloudinary for image storage
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Features

- Restaurant donation creation with AI-powered food identification
- NGO registration and authentication
- Real-time matching of donations with nearby NGOs
- AI-powered NGO recommendations based on food type and location
- Donation tracking and status updates
- Platform statistics and impact metrics

## API Endpoints

### Donations

- `POST /api/donations` - Create a new donation
- `GET /api/donations` - Get all donations
- `GET /api/donations/:id` - Get a specific donation
- `PUT /api/donations/:id/status` - Update donation status
- `DELETE /api/donations/:id` - Delete a donation

### NGOs

- `POST /api/ngos/register` - Register a new NGO
- `POST /api/ngos/login` - Login as an NGO
- `GET /api/ngos` - Get all NGOs
- `GET /api/ngos/:id` - Get a specific NGO
- `PUT /api/ngos/:id` - Update NGO profile
- `DELETE /api/ngos/:id` - Delete an NGO

### Statistics

- `GET /api/stats` - Get platform statistics
- `GET /api/stats/ngo/:id` - Get NGO-specific statistics

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on `.env.example`
5. Start the development server:
   ```
   npm run dev
   ```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Google Gemini API key
- `JWT_SECRET` - Secret for JWT token signing
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret