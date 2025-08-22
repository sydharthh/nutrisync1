const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  dietType: String,
  calories: Number,
  height: Number,
  weight: Number,
  goal: String,
  activityLevel: String,
  healthConditions: [String],
  otherCondition: String,
  selectedMeals: Object,
  mealPlan: String,
  nutrition: {
    protein: Number,
    carbs: Number,
    fats: Number,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
