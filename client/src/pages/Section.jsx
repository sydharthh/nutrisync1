import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios'; // Adjust the path to your axios instance if required

const Section = () => {
  const { id } = useParams(); // Course ID from the URL parameter
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await axios.get(`/sections/${id}`); // Fetch sections for the course
        setSections(response.data);
      } catch (err) {
        setError('Failed to load sections.');
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [id]);

  if (loading) return <div className="text-center">Loading sections...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <div className="container mt-5">
      <h1>Course Sections</h1>
      {sections.length > 0 ? (
        sections.map((section) => (
          <div key={section._id} className="card shadow-sm p-3 mb-3">
            <h3>{section.title}</h3>
            <ul>
              {section.materials.map((material, index) => (
                <li key={index}>
                  <a href={"http://localhost:5000" + material.url} target="_blank" rel="noopener noreferrer">
                  <strong>{material.type.toUpperCase()}</strong>{' '}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="text-center">No sections available for this course.</div>
      )}
    </div>
  );
};

export default Section;
