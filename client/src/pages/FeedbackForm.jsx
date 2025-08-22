import React, { useState } from "react";
import axios from "../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FeedbackForm = () => {
  const [rating, setRating] = useState(5);
  const [suggestions, setSuggestions] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { "x-auth-token": token },
      };

      await axios.post("/feedback", { rating, suggestions }, config);
      setMessage("Feedback submitted successfully!");
      setRating(5);
      setSuggestions("");
    } catch (err) {
      setMessage("Error submitting feedback");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Submit Your Feedback</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Rating (1-5)</label>
          <input
            type="number"
            className="form-control"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Suggestions</label>
          <textarea
            className="form-control"
            rows="3"
            value={suggestions}
            onChange={(e) => setSuggestions(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>

      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
};

export default FeedbackForm;
