const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    // Nutritional values
    calorie: { type: Number, default: 0 },
    protein: { type: Number, default: 0 }, // Fixed typo from "protien" to "protein"
    fat: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    micro: { type: String, required: true },

    // Image storage (multiple images supported)
    images: { type: [String], default: [] }, 

    // Additional product details
    shippingCharges: { type: Number, default: 0 }, // Optional shipping cost
    estimatedDeliveryTime: { type: String }, // Estimated delivery time

    // Verification and supplier details
    isVerified: { type: Boolean, default: false }, // Admin verification status
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
