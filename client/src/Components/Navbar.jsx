import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import axios from 'axios';
import config from '../config';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: '#0a0a0a',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="NutriSync Logo"
            style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
          />
          <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.8rem', fontWeight: 'bold', letterSpacing: '2px', color: '#fff' }}>
            Nutri<span style={{ color: '#5ba3a8' }}>Sync</span>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* If no user is logged in, show Home, Register, and Login */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                {/* Show Admin-specific options */}
                {user?.role === 'admin' ? (
                  <li className="nav-item">
                    <Link className="nav-link text-warning fw-bold" to="/admin/dashboard">Verify</Link>
                  </li>
                ) : (
                  <>
                    {/* Show "Features" only for non-mentors */}
                    {user?.role !== 'mentor' && (
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/dashboard">Features</Link>
                      </li>
                    )}
                    {/* Show "DIET/MEAL" only for mentors */}
                    {user?.role === 'mentor' && (
                      <li className="nav-item">
                        <Link className="nav-link text-white" to="/mentor/dashboard">DIET/MEAL</Link>
                      </li>
                    )}
                  </>
                )}

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">Profile</Link>
                </li>

                <li className="nav-item">
                  <button className="btn btn-link nav-link text-white" onClick={handleLogout}>
                    Logout
                  </button>
                </li>

                {/* Show Feedback link only if the user is not an admin */}
                {user?.role !== 'admin' && user?.role !== 'mentor' && (
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/feedback">Feedback</Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
