const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel");
const auth = require("../middleware/auth"); // Ensure authentication middleware is used
const authMiddleware = require("../middleware/authMiddleware"); 
// Submit feedback
router.post("/", auth, async (req, res) => {
    try {
        const { rating, suggestions } = req.body;

        const feedback = new Feedback({
            rating,
            suggestions,
            userId: req.user.userId,

        });


        await feedback.save();
        res.status(201).json({ message: "Feedback submitted successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get all feedback (For Admin/Mentor)
router.get("/", auth, async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("userId", "name email");
        res.status(200).json(feedbacks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }

    
});

// Get all feedback (Admin Only)
router.get("/", authMiddleware, async (req, res) => {
    try {
      // Ensure only admins can view feedback
      if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Access denied. Admins only." });
      }
  
      const feedbacks = await Feedback.find().populate("userId", "name email");
      res.json(feedbacks);
    } catch (error) {
      res.status(500).json({ error: "Error fetching feedback." });
    }
  });
  

module.exports = router;
