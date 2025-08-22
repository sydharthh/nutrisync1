const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// POST route to place an order
router.post("/place-order", auth, async (req, res) => {
  try {
    const { dietType, calories, height, weight, goal, activityLevel, healthConditions, otherCondition, selectedMeals, mealPlan } = req.body;

    const nutrition = {
      protein: (calories * 0.3) / 4, // 30% of calories from protein, 1g protein = 4 kcal
      carbs: (calories * 0.5) / 4, // 50% of calories from carbs
      fats: (calories * 0.2) / 9, // 20% of calories from fats
    };

    const newOrder = new Order({
      dietType,
      calories,
      height,
      weight,
      goal,
      activityLevel,
      healthConditions,
      otherCondition,
      selectedMeals,
      mealPlan,
      nutrition,
      userId: req.user.userId,  
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order", details: error.message });
  }
});

// GET all orders of the logged-in user and calculate total nutrition values
router.get("/my-orders", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No nutrition data found" });
    }

    const totalNutrition = orders.reduce(
      (acc, order) => {
        acc.calories += order.calories;
        acc.protein += order.nutrition.protein;
        acc.carbs += order.nutrition.carbs;
        acc.fats += order.nutrition.fats;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    res.status(200).json({ orders, totalNutrition });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
});

// GET all orders for partners
router.get("/partner-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders", details: error.message });
  }
});

// Accept an order
router.post("/accept/:orderId", auth, async (req, res) => {
  try {
    const { orderId } = req.params;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "Accepted" }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order accepted successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: "Failed to accept order", details: error.message });
  }
});

// Fetch meal plans from orders
router.get("/mealplans", auth, async (req, res) => {
  try {
    const mealPlans = await Order.find({}, "mealPlan userId createdAt").sort({ createdAt: -1 });

    res.status(200).json({ mealPlans });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meal plans", details: error.message });
  }
});

module.exports = router;
