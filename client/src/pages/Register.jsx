import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Updated password regex: Requires at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and 8+ characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name) {
      newErrors.name = 'Name is required';
    }

    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password || !passwordRegex.test(password)) {
      newErrors.password =
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) {
      return;  // Stop submission if there are validation errors
    }

    setLoading(true); // Set loading to true

    try {
      // Send registration request
      const res = await axios.post('/auth/register', { name, email, password, role: 'user' });

      // Store the token in localStorage
      localStorage.setItem('token', res.data.token);

      // Navigate to the dashboard and refresh the page
      navigate('/dashboard');
      window.location.reload();  // Refresh the dashboard page
    } catch (error) {
      console.error('Registration failed:', error);
      // Optionally, you can set an error message here if needed
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleBlur = (field) => {
    validateForm(); // Validate on blur
  };

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' })); // Clear specific error
  };

  return (
    <div className="container mt-5">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={name}
            onChange={handleChange(setName)}
            onBlur={() => handleBlur('name')}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={handleChange(setEmail)}
            onBlur={() => handleBlur('email')}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={password}
            onChange={handleChange(setPassword)}
            onBlur={() => handleBlur('password')}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <div className="mt-3">
        <a href="/register-trainer" className="btn btn-secondary">Register as Teacher</a>
      </div>
    </div>
  );
};

export default Register;
