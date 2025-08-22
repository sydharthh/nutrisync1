import React from 'react'; 
import { Link } from 'react-router-dom'; 
import Chatbot from './Chatbot'; // Import the Chatbot component
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const isLoggedIn = true; // You can replace this with actual login check logic

  return (
    <section className="dashboard py-5 bg-light" style={{ position: 'relative', height: '100vh' }}>
      {/* Background Video Container */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <video
          autoPlay
          loop
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src="/bg5.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Yellow Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(243, 243, 243, 0)',
        }}
      ></div>

      {/* Main Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <h2 className={`${styles['features-heading']} mb-5`}>Welcome to our Features</h2>


        <div className="row g-4">

          {/* Card 1: Diet Plans */}
          <div className="col-md-3">
            <div className="card border-0 shadow h-100 text-center bg-transparent">
              <div className="card-body">
                <h3 className="card-title">Diet Plans</h3>
                <p className="card-text">View insights and trends to monitor your progress.</p>
                <Link 
                  to="/courses" 
                  className="btn btn-outline-light mt-3" 
                  style={{ backgroundColor: '#ffb6c1', color: 'white' }}
                >
                  Select Diet Plans
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Meal Plans */}
          <div className="col-md-3">
            <div className="card border-0 shadow h-100 text-center bg-transparent">
              <div className="card-body">
                <img src="https://img.icons8.com/ios/452/meal.png" alt="Meal Plans" style={{ width: '70px', height: '70px' }} />
                <h3 className="card-title">AI's Meal Plans</h3>
                <p className="card-text">Access and customize your personalized meal plans.</p>
                <Link 
                  to="/dashboard/mealplans" 
                  className="btn btn-outline-light mt-3" 
                  style={{ backgroundColor: '#ffb6c1', color: 'white' }}
                >
                  View Meal Plans
                </Link> 
              </div>
            </div>
          </div>

          {/* Card 3: Analytics */}
          <div className="col-md-3">
            <div className="card border-0 shadow h-100 text-center bg-transparent">
              <div className="card-body">
                <img src="https://img.icons8.com/ios/452/settings.png" alt="Settings" style={{ width: '70px', height: '70px' }} />
                <h3 className="card-title">Analytics</h3>
                <p className="card-text">Calculate and monitor your progress.</p>
                <Link 
                  to="/dashboard/mealplans/nutrision" 
                  className="btn btn-outline-light mt-3" 
                  style={{ backgroundColor: '#ffb6c1', color: 'white' }}
                >
                  Manage Nutrision
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4: Shop Page */}
          <div className="col-md-3">
            <div className="card border-0 shadow h-100 text-center bg-transparent">
              <div className="card-body">
                <img src="https://img.icons8.com/ios/452/shop.png" alt="Shop Page" style={{ width: '70px', height: '70px' }} />
                <h3 className="card-title">Shop</h3>
                <p className="card-text">Explore our products and start shopping.</p>
                <Link 
                  to="/shop" 
                  className="btn btn-outline-light mt-3" 
                  style={{ backgroundColor: '#ffb6c1', color: 'white' }}
                >
                  Go to Shop
                </Link> 
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Conditionally render the Chatbot if the user is logged in */}
      <Chatbot isLoggedIn={isLoggedIn} />
    </section>
  );
};

export default Dashboard;
