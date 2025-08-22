const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Registration route
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the role is admin
    const isAdmin = role === 'admin';

    // Create new user with hashed password
    user = new User({ name, email, password: hashedPassword, role, isAdmin });
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log("Login attempt with email:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log("User found:", user);

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, role: user.role, isAdmin: user.isAdmin });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/getuser", auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
