import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/auth/profile', config);
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading)
    return <div className="d-flex justify-content-center align-items-center vh-100 text-white">Loading profile...</div>;
  if (error)
    return <div className="d-flex justify-content-center align-items-center vh-100 text-danger">{error}</div>;

  return (
    <section className={styles['profile-section']}>
      {/* Background Video */}
      

      {/* Overlay */}
      <div className={styles.overlay}></div>

      {/* Profile Card */}
      <div className={styles['profile-card']}>
        <h3>User Profile</h3>
        <hr className="border-white" />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <button
          className={styles['logout-btn']}
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Profile;
