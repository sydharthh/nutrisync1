import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../bootstrap.css';
import '../styles.css'; // Assuming the CSS is in a file called 'styles.css'
import config from '../config';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await axios.get('http://localhost:5000/api/auth/getUser', config);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <section
      id="home"
      className="hero d-flex align-items-center justify-content-center text-center text-white position-relative"
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="position-absolute w-100 h-100"
        style={{
          objectFit: 'cover',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <source src="/bg4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Hero Content */}
      <div className="container position-relative text-center" style={{ zIndex: 2 }}>
        <h1
          className="display-4 fw-bold mb-3"
          style={{
            color: '#d2b48c',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Your Personal AI Nutrition Coach
        </h1>

        <p
          className="lead mb-4"
          style={{
            color: '#f5f5dc',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Achieve your health goals with personalized meal plans
        </p>

        <div className="d-flex justify-content-center gap-3">
          {(!user || user.role !== 'mentor') && (
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
              Get Started
            </button>
          )}
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('/About')}>
            Learn More
          </button>
          {user && user.role === 'partner' && (
            <button className="btn btn-success btn-lg" onClick={() => navigate('/partner/orders')}>
              Partner Orders
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
