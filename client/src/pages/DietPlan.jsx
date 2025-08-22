import React, { useState } from 'react';
import { getDietSuggestions } from '../services/chatgptService'; // Import your API service
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { useNavigate } from 'react-router-dom';
import config from '../config';
import instance from '../axios';

// Fetch meal image from Pexels API
const fetchPexelsImage = async (query) => {
  const apiKey = 'rGNJKdN4vaPn865nOP9BoiZT2h6pkrefo0r9i7e0dCfgQlC97bQCPnZu'; // Replace with your actual Pexels API key
  const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    const data = await response.json();
    return data.photos[0]?.src?.medium || '/default-image.jpg'; // Fallback image
  } catch (error) {
    console.error('Error fetching Pexels image:', error);
    return '/default-image.jpg';
  }
};

const DietPlan = () => {
  const [dietType, setDietType] = useState('non-vegetarian');
  const [calories, setCalories] = useState(1500);
  const [mealPlan, setMealPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // State to track if the order is placed
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State for payment modal visibility

  // New state variables for additional inputs
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [healthConditions, setHealthConditions] = useState([]);
  const [otherCondition, setOtherCondition] = useState('');

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [deliveryLocation, setDeliveryLocation] = useState('home'); // New state for delivery location
  const [address, setAddress] = useState(''); // New state for address
  const [pinCode, setPinCode] = useState(''); // New state for pin code
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number

  const [errors, setErrors] = useState({}); // State for error messages

  const navigate = useNavigate();

  // New state for meal selection
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  // Function to handle multiple health conditions (checkboxes)
  const handleHealthConditionChange = (e) => {
    const { value, checked } = e.target;
    setHealthConditions((prev) =>
      checked ? [...prev, value] : prev.filter(item => item !== value)
    );
  };

  // Function to handle meal option selection (checkboxes)
  const handleMealSelectionChange = (e) => {
    const { name, checked } = e.target;
    setSelectedMeals(prev => ({ ...prev, [name]: checked }));
  };

  const fetchMealPlan = async () => {
    setLoading(true);
    try {
      // Construct the prompt with additional information
      const meals = Object.keys(selectedMeals).filter(meal => selectedMeals[meal]).join(', ') || 'all meals';
      const prompt = `Suggest a diet plan based on the following details:
        - Diet Type: ${dietType}
        - Calories: ${calories}
        - Height: ${height} cm
        - Weight: ${weight} kg
        - Goal: ${goal}
        - Activity Level: ${activityLevel}
        - Health Conditions: ${healthConditions.join(', ')}
        - Other Conditions: ${otherCondition}
        - Meals Requested: ${meals}`;
      
      // Fetch meal plan from the API (replace with your API service)
      const plan = await getDietSuggestions(prompt);
      setMealPlan(plan);
    } catch (error) {
      setMealPlan('Failed to fetch meal plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = () => {
    setShowPaymentModal(true); // Show the payment modal
  };

  const validatePaymentDetails = () => {
    const newErrors = {};
    const cardNumberPattern = /^\d{16}$/; // 16 digits
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/; // MM/YY or MM/YYYY
    const cvvPattern = /^\d{3}$/; // 3 digits
    const phonePattern = /^\d{10}$/; // 10 digits

    if (!paymentDetails.cardNumber.match(cardNumberPattern)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (!paymentDetails.expiryDate.match(expiryDatePattern)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    }
    if (!paymentDetails.cvv.match(cvvPattern)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }
    if (!address) {
      newErrors.address = "Address is required.";
    }
    if (!pinCode) {
      newErrors.pinCode = "Pin code is required.";
    }
    if (!phoneNumber.match(phonePattern)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!validatePaymentDetails()) {
      return; // Stop submission if validation fails
    }

    try {
      const orderDetails = {
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
        paymentDetails, // Include payment details
        deliveryLocation, // Include delivery location
        address, // Include address
        pinCode, // Include pin code
        phoneNumber, // Include phone number
      };

      const response = await instance.post('/orders/place-order', orderDetails, config);

      const data = response.data;
      if (response.status === 201) {
        setOrderPlaced(true);
        setShowPaymentModal(false); // Hide the payment modal
        setTimeout(() => {
          navigate("/dashboard/mealplans/nutrision"); // Navigate to meals page after 3 seconds
        }, 1500);
      } else {
        alert("Order failed: " + data.error);
      }
    } catch (error) {
      alert("Error placing order: " + error.message);
    }
  };

  // New back button function
  const handleBack = () => {
    navigate("/dashboard"); // Navigate back to Dashboard
  };

  return (
    <div className="container my-5" style={{ background: 'url(/path-to-your-image.jpg)', backgroundSize: 'cover', minHeight: '100vh' }}>
      <div className="card shadow-lg">
        <div className="card-body">
          {/* Back Button */}
          <button onClick={handleBack} className="btn btn-secondary mb-4">
            Back to Features
          </button>

          <h1 className="text-center mb-4 text-dark">Personalized Diet Plan</h1>
          <form>
            <div className="mb-3">
              <label className="form-label text-dark">Diet Type:</label>
              <select className="form-select" value={dietType} onChange={(e) => setDietType(e.target.value)}>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Calories Target:</label>
              <input
                type="number"
                className="form-control"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>

            {/* New Fields for Height, Weight, Goal, Activity Level */}
            <div className="mb-3">
              <label className="form-label text-dark">Height (cm):</label>
              <input
                type="number"
                className="form-control"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Weight (kg):</label>
              <input
                type="number"
                className="form-control"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Goal:</label>
              <select className="form-select" value={goal} onChange={(e) => setGoal(e.target.value)}>
                <option value="maintain">Maintain Weight</option>
                <option value="lose">Lose Weight</option>
                <option value="gain">Gain Weight</option>
                <option value="build muscle">Build Muscle</option>
                <option value="improve endurance">Improve Endurance</option>
                <option value="increase energy">Increase Energy</option>
                <option value="boost metabolism">Boost Metabolism</option>
                <option value="detox">Detox</option>
                <option value="improve digestion">Improve Digestion</option>
                <option value="reduce inflammation">Reduce Inflammation</option>
                <option value="support heart health">Support Heart Health</option>
                <option value="manage cholesterol">Manage Cholesterol</option>
                <option value="enhance skin health">Enhance Skin Health</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Activity Level:</label>
              <select className="form-select" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                <option value="moderate">Moderate Activity</option>
                <option value="high">High Activity</option>
                <option value="low">Low Activity</option>
              </select>
            </div>

            {/* Health Conditions */}
            <div className="mb-3">
              <label className="form-label text-dark">Health Conditions:</label>
              <div>
                <label className="form-check-label text-dark">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Diabetes"
                    onChange={handleHealthConditionChange}
                  /> Diabetes
                </label>
                <label className="form-check-label text-dark ms-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Hypertension"
                    onChange={handleHealthConditionChange}
                  /> Hypertension
                </label>
                <label className="form-check-label text-dark ms-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Gluten Intolerance"
                    onChange={handleHealthConditionChange}
                  /> Gluten Intolerance
                </label>
                <label className="form-check-label text-dark ms-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="Other"
                    onChange={handleHealthConditionChange}
                  /> Other (Please Specify)
                </label>
              </div>
              {healthConditions.includes("Other") && (
                <div>
                  <label className="form-label text-dark">Other Condition (Please Specify):</label>
                  <input
                    type="text"
                    className="form-control"
                    value={otherCondition}
                    onChange={(e) => setOtherCondition(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Meals */}
            <div className="mb-3">
              <label className="form-label text-dark">Meals:</label>
              <div>
                <label className="form-check-label text-dark">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="breakfast"
                    onChange={handleMealSelectionChange}
                  /> Breakfast
                </label>
                <label className="form-check-label text-dark ms-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="lunch"
                    onChange={handleMealSelectionChange}
                  /> Lunch
                </label>
                <label className="form-check-label text-dark ms-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="dinner"
                    onChange={handleMealSelectionChange}
                  /> Dinner
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mb-3 text-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={fetchMealPlan}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Generate Diet Plan'}
              </button>
            </div>
          </form>

          {/* Display Meal Plan */}
          {mealPlan && !orderPlaced && (
            <div className="alert alert-success" role="alert">
              {mealPlan}
            </div>
          )}

          {/* Order Button */}
          {mealPlan && !orderPlaced && (
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          )}

          {/* Payment Modal */}
          {showPaymentModal && (
            <div className="modal show" style={{ display: "block" }} aria-labelledby="paymentModalLabel" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="paymentModalLabel">Payment Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShowPaymentModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                        />
                        {errors.cardNumber && <div className="text-danger">{errors.cardNumber}</div>}
                      </div>
                      
                      <div className="mb-3">
                      <input
  type="text"
  className="form-control"
  value={paymentDetails.expiryDate}
  onChange={(e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (value.length > 4) {
      value = value.slice(0, 4); // Limit to 4 digits (MMYY)
    }

    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2); // Add '/' after MM
    }

    setPaymentDetails({ ...paymentDetails, expiryDate: value });
  }}
  maxLength="5" // Ensure input doesn't exceed MM/YY format
  placeholder="MM/YY"
/>

                      </div>
                      
                      <div className="mb-3">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                        />
                        {errors.cvv && <div className="text-danger">{errors.cvv}</div>}
                      </div>

                      {/* New Fields for Address and Phone Number */}
                      <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && <div className="text-danger">{errors.address}</div>}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Pin Code</label>
                        <input
                          type="text"
                          className="form-control"
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                        />
                        {errors.pinCode && <div className="text-danger">{errors.pinCode}</div>}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Payment Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          value="500 Rs"
                          readOnly
                        />
                      </div>
                      
                      <button type="submit" className="btn btn-primary">Submit Payment</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietPlan;