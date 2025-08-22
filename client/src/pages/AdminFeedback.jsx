import React, { useEffect, useState } from "react";
import axios from "../axios"; // Ensure this points to your API
import "bootstrap/dist/css/bootstrap.min.css";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { "x-auth-token": token },
        };

        const response = await axios.get("/feedback", config);
        setFeedbacks(response.data);
      } catch (err) {
        setError("Error fetching feedback.");
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Feedback</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Suggestions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <tr key={fb._id}>
                <td>{fb.userId?.name || "Anonymous"}</td>
                <td>{fb.userId?.email || "N/A"}</td>
                <td>{fb.rating}</td>
                <td>{fb.suggestions}</td>
                <td>{new Date(fb.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No feedback available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFeedback;
