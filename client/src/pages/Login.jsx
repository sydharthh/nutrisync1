import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import styles from '../styles/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/auth/login', { email, password });
      const { token, role, isVerified, message } = res.data;

      if (!token) {
        setError(message || 'Login failed.');
        return;
      }

      // Store user data
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('isVerified', isVerified);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'mentor') {
        navigate('/mentor/dashboard');
      } else {
        navigate('/dashboard');
      }
      setTimeout(() => {
        window.location.reload()

      }, 1000)
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-card']}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <button type="submit" className={styles['login-button']}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
