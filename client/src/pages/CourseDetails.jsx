import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';

const CourseDetails = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate(); // For navigation
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaid, setIsPaid] = useState(false); // State to check payment status

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Fetch course details
        const courseResponse = await axios.get(`/courses/${id}`);
        setCourse(courseResponse.data);

        // Check payment status
        const paymentResponse = await axios.get(`/courses/${id}/check`);
        setIsPaid(paymentResponse.data.isPaid); // Update isPaid state
      } catch (err) {
        setError('Failed to fetch course details or payment status.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <div className="text-center">Loading course details...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  const handleAction = () => {
    if (isPaid) {
      navigate(`/section/${id}`); // Navigate to course content if paid
    } else {
      navigate(`/payment/${id}/${course.fee}`); // Navigate to payment page
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: Course Information */}
        <div className="col-md-8">
          <h1 className="mb-3">{course.title}</h1>
          <p className="lead">{course.description}</p>
          <p><strong>Fee:</strong> ₹{course.fee}</p>
          {course.logo && (
            <img
              src={`http://localhost:5000${course.logo}`}
              alt={course.title}
              className="img-fluid rounded mb-4"
            />
          )}
         
        </div>

        {/* Right Column: Payment Section */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h4 className="mb-3">{isPaid ? 'Start Now' : 'Enroll Now'}</h4>
            <p className="text-muted mb-4">
              {isPaid
                ? 'You have already paid for this diet plan. Start taking now!'
                : `Join this diet plan for just ₹${course.fee}!`}
            </p>
            <button className="btn btn-primary w-100" onClick={handleAction}>
              {isPaid ? 'Start Now' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
