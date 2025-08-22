// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated by looking for a token in localStorage
  const isLoggedIn = !!localStorage.getItem('token');

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If logged in, render the children (protected pages)
  return children;
};

export default ProtectedRoute;
