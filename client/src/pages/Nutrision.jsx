import React, { useEffect, useState } from "react";
import axios from "../axios";
import config from "../config";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Nutrision.module.css";

const Nutrision = () => {
  const [orders, setOrders] = useState([]);
  const [totalNutrition, setTotalNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [sleepFeedback, setSleepFeedback] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders/my-orders", config);
        setOrders(response.data.orders);
        setTotalNutrition(response.data.totalNutrition);
      } catch (err) {
        setError("Failed to fetch nutrition data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleSleepChange = (e) => {
    const sleep = e.target.value;
    setSleepHours(sleep);

    if (sleep !== "" && !isNaN(sleep)) {
      const hours = parseFloat(sleep);
      if (hours < 5) {
        setSleepFeedback("You are sleep-deprived. Try to get more rest!");
      } else if (hours >= 5 && hours <= 8) {
        setSleepFeedback("Good sleep! Keep maintaining this habit.");
      } else {
        setSleepFeedback("You might be oversleeping. Aim for 7-8 hours for optimal health.");
      }
    } else {
      setSleepFeedback("");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className={`container-fluid ${styles["nutrition-container"]}`}>
      <h2 className="text-center text-light fw-bold mb-4">🍏 Nutrition Summary</h2>
      <button onClick={handleBack} className={`btn ${styles["btn-custom"]} mb-4`}>
        ← Back to Dashboard
      </button>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-warning loading-spinner" role="status"></div>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : totalNutrition ? (
        <>
          <div className={`card ${styles["card-custom"]} mb-4`}>
            <h4 className="text-center text-highlight">Total Nutrition</h4>
            <hr />
            <p><strong>Calories:</strong> <span className="text-accent">{totalNutrition.calories} kcal</span></p>
            <p><strong>Protein:</strong> {totalNutrition.protein.toFixed(2)} g</p>
            <p><strong>Carbs:</strong> {totalNutrition.carbs.toFixed(2)} g</p>
            <p><strong>Fats:</strong> {totalNutrition.fats.toFixed(2)} g</p>
          </div>

          <h3 className="text-center text-warning mt-4">🛍️ Order History</h3>
          {orders.map((order, index) => (
            <div key={index} className={`card ${styles["card-custom"]} mb-3`}>
              <h5 className="fw-bold">Order {index + 1}</h5>
              <p><strong>Calories:</strong> {order.calories}  kcal</p>
              <p><strong>Protein:</strong> {order.nutrition.protein.toFixed(2)} g</p>
              <p><strong>Carbs:</strong> {order.nutrition.carbs.toFixed(2)} g</p>
              <p><strong>Fats:</strong> {order.nutrition.fats.toFixed(2)} g</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}

          {/* Sleep Tracking Box */}
          <div className={`card ${styles["sleep-box"]} position-fixed`} style={{ top: "20px", right: "20px", width: "350px", zIndex: 1000 }}>
            <h4 className="text-center text-info">🛏️ Sleep Tracking</h4>
            <label htmlFor="sleepInput" className="form-label">Enter your sleep hours:</label>
            <input
              type="number"
              id="sleepInput"
              className="form-control mt-2"
              value={sleepHours}
              onChange={handleSleepChange}
              placeholder="Enter hours slept"
            />
            {sleepFeedback && (
              <p className="mt-2 text-primary text-center"><strong>{sleepFeedback}</strong></p>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-light">No nutrition data available.</p>
      )}
    </div>
  );
};

export default Nutrision;
