import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">About Our AI Nutrition Platform</h1>
        <p className="lead text-muted">
          Empowering your health with AI-driven personalized meal plans and tracking.
        </p>
      
      </div>

      {/* Features Section */}
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h5 className="card-title">AI-Powered Plans</h5>
              <p className="card-text">Get customized meal plans tailored to your fitness goals.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg border-0">
            <div className="card-body text-center">
              <h5 className="card-title">Real-Time Tracking</h5>
              <p className="card-text">Monitor your progress with intelligent nutrition tracking.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learn More Section */}
      <div className="mt-5 p-5 bg-light rounded">
        <h2 className="text-center">Why Choose Us?</h2>
        <p className="text-center text-muted">
          We combine cutting-edge AI with professional guidance to help you achieve optimal health.
        </p>
        <div className="text-center">
          <button className="btn btn-success btn-lg" onClick={() => alert("Explore more features coming soon!")}>
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;