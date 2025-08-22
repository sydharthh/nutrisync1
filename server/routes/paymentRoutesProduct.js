const express = require('express');
const productBookings = require("../models/productBookings");
const auth = require("../middleware/auth");

const router = express.Router();


router.post('/verify-payment/product',auth, async (req, res) => {

 

  try {
    // Step 1: Save enrollment details in the database
    const newEnrollment = new productBookings({
      userId: req.user.userId, // Authenticated user ID
      itemId: req.body.itemId,
      amountPaid: req.body.amount,
      status: 'Paid',
      createdAt: new Date(),
    });

    await newEnrollment.save();
   
    console.log("Payment verified and enrollment saved:", newEnrollment);

    res.status(200).json({ success: true, message: 'Payment verified and booking successful.' });
  } catch (error) {
    console.error("Error during enrollment:", error);
    res.status(500).json({ success: false, message: 'Enrollment saving failed.', error });
  }
});

module.exports = router;
