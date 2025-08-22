import React, { useEffect, useState } from "react";
import axios from "../axios";
import config from "../config";

const PartnerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders/partner-orders", config);
        console.log(response.data.orders);

        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const acceptOrder = async (orderId) => {
    try {
      await axios.post(`/orders/accept/${orderId}`, {}, config);
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: "Accepted" } : order));
      alert("Order accepted successfully");
    } catch (err) {
      alert("Failed to accept order");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Partner Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : orders.length ? (
        orders.map((order) => {
          let mealPlan = [];
          try {
            mealPlan = order.mealPlan;
          } catch (error) {
            console.error("Error parsing mealPlan:", error);
          }

          return (
            <div key={order._id} className="card p-3 mb-3">
              <h5>Order ID: {order._id}</h5>
              <p><strong>Diet Type:</strong> {order.dietType}</p>
              <p><strong>Calories:</strong> {order.calories} kcal</p>
              <p><strong>Goal:</strong> {order.goal}</p>
              <p><strong>Activity Level:</strong> {order.activityLevel}</p>
              <p><strong>Health Conditions:</strong> {order.healthConditions?.join(", ") || "None"}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>

              {/* Display Meal Plan if available */}
              <div>
                <h6>Meal Plan:</h6>
                <ul>
                  {order.mealPlan ? (
                    <li>{order.mealPlan}</li>
                  ) : (
                    <p>No meal plan available</p>
                  )}
                </ul>
              </div>

              <button className="btn btn-success" onClick={() => acceptOrder(order._id)} disabled={order.status === "Accepted"}>
                {order.status === "Accepted" ? "Accepted" : "Accept Order"}
              </button>
            </div>
          );
        })
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
};

export default PartnerOrders;
