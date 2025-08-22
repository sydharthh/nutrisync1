const express = require('express');
const router = express.Router();
const multer = require('multer');
const enrollmentModel = require('../models/enrollmentModel');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

// Add a product
router.post('/products', auth, upload.fields([
  { name: 'image', maxCount: 5 },  // Allow multiple images (adjust maxCount as needed)
]), async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      calorie,
      protien,
      fat,
      carbs,
      micro,
      shippingCharges,
      estimatedDeliveryTime,
    } = req.body;

    const image = req.files ? req.files.image.map(file => file.path) : []; // Handling multiple image files

    if (!name || !description || !price) {
      return res.status(400).json({ message: 'Please fill out all required fields' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      calorie,
      protien,
      fat,
      carbs,
      micro,
      shippingCharges,
      estimatedDeliveryTime,
      supplier: req.user.userId,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all products of a supplier
router.get('/products', auth, async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.user.userId });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// Delete a product
router.delete('/products/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify a product (Admin only)
router.patch('/products/:id/verify', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Only admins can verify products.' });
    }

    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { isVerified: true },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product verified successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Failed to verify product', error: error.message });
  }
});

module.exports = router;
