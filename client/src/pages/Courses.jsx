import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from '../axios';
import styles from '../styles/Courses.module.css'; // Import custom CSS for styling

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses/all'); // Fetch all courses
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      {/* Back button */}
      <Link to="/dashboard" className={`${styles.backButton} btn btn-secondary mb-4`}>
        ⬅ Back to Features
      </Link>

      <h1 className={styles.heading}>🍓 Healthy Diet Plans</h1>

      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-4" key={course._id}>
            <div className={`${styles.courseCard} card h-100`}>
              {course.logo && (
                <img
                  src={`http://localhost:5000${course.logo}`}
                  alt={course.title}
                  className={`${styles.courseImage} card-img-top`}
                />
              )}
              <div className="card-body">
                <h5 className={styles.cardTitle}>{course.title}</h5>
                <p className={styles.cardText}>{course.description.substring(0, 100)}...</p>
                <Link to={`/courses/${course._id}`} className={`${styles.detailsButton} btn`}>
                  💖 View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
