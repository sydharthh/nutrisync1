// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

console.log("hi"); // Log for confirming server startup

// Static route for handling file uploads (e.g., images)
app.use('/uploads', express.static('uploads'));

// Define API routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/admin', require('./routes/admin')); // Admin-related routes
app.use('/api/courses', require('./routes/courses')); // Courses routes
app.use('/api/sections', require('./routes/sections')); // Sections management routes
// app.use('/api/mentor', require('./routes/mentor')); // Uncomment if mentorship functionality is required
app.use('/api/payments', require('./routes/paymentRoutes')); // Payment-related routes
app.use('/api/suppliers', require('./routes/productRoutes')); // Product management routes for suppliers
app.use('/api/customers', require('./routes/customerRoutes')); // Customer management routes
app.use('/api/payments', require('./routes/paymentRoutesProduct')); // Additional payment routes (specific to products)
app.use('/api/orders', require('./routes/orderRoutes')); // Order management routes
app.use("/api/feedback",require('./routes/feedbackRoutes'));



// Start the server and listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



