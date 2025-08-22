import React, { useState, useEffect } from 'react';
import axios from '../axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import AdminFeedback from "./AdminFeedback";

const AdminPanel = () => {
  const [mentors, setMentors] = useState([]);
  const [products, setProducts] = useState([]);

  // Retrieve the token from localStorage or any other mechanism
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      'x-auth-token': token,
    },
  };

  // Fetch mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get('/admin/mentors', config);
        setMentors(response.data);
      } catch (err) {
        console.error('Error fetching mentors:', err);
      }
    };

    fetchMentors();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/products/all', config);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  // Handle mentor verification
  const handleMentorVerification = async (mentorId, isVerified) => {
    try {
      await axios.put(`/admin/mentors/${mentorId}/verify`, { isVerified }, config);

      // Update state
      setMentors((prev) =>
        prev.map((mentor) => mentor._id === mentorId ? { ...mentor, isVerified } : mentor)
      );
    } catch (err) {
      console.error('Error updating mentor verification status:', err);
    }
  };

  // Handle product verification
  const handleProductVerification = async (productId, isVerified) => {
    try {
      await axios.put(`/admin/products/${productId}/verify`, { isVerified }, config);

      // Update state
      setProducts((prev) =>
        prev.map((product) => product._id === productId ? { ...product, isVerified } : product)
      );
    } catch (err) {
      console.error('Error updating product verification status:', err);
    }
  };

  return (
    
    <div className="container mt-5">
      <div className="card shadow mb-4">
        <div className="card-header">
          <h2 className="text-center">Admin Panel - Partner Verification</h2>
          <div>
      <h1 className="text-center">Admin Dashboard</h1>
      <AdminFeedback />
    </div>
        </div>
        <div className="card-body">
          {mentors.length > 0 ? (
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map(mentor => (
                  <tr key={mentor._id}>
                    <td>{mentor.name}</td>
                    <td>{mentor.email}</td>
                    <td>
                      <span className={`badge ${mentor.isVerified ? 'bg-success' : 'bg-danger'}`}>
                        {mentor.isVerified ? 'Verified' : 'Not Verified'}
                      </span>
                    </td>
                    <td>
                      {mentor.isVerified ? (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleMentorVerification(mentor._id, false)}
                        >
                          Unverify
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleMentorVerification(mentor._id, true)}
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info text-center">
              No partner available.
            </div>
          )}
        </div>
      </div>

      {/* Product Verification Section */}
      <div className="card shadow">
        <div className="card-header">
          <h2 className="text-center">Admin Panel - Product Verification</h2>
        </div>
        <div className="card-body">
          {products.length > 0 ? (
            <table className="table table-hover table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Supplier</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>RS {product.price}</td>
                    <td>{product.supplier?.name || 'Unknown'}</td>
                    <td>
                      <span className={`badge ${product.isVerified ? 'bg-success' : 'bg-danger'}`}>
                        {product.isVerified ? 'Verified' : 'Not Verified'}
                      </span>
                    </td>
                    <td>
                      {product.isVerified ? (
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleProductVerification(product._id, false)}
                        >
                          Unverify
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleProductVerification(product._id, true)}
                        >
                          Verify
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info text-center">
              No products available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
