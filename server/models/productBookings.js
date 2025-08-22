const mongoose = require('mongoose');

const productBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  paymentId: { type: String},
  amountPaid: { type: Number },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['Paid', 'Failed'], default: 'Paid' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', productBookingSchema);



