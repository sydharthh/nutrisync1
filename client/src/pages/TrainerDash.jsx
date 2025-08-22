import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const TrainerDash = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", zIndex: 1 }}>
        <video autoPlay loop muted style={{ width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/food.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Overlay */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.38)", zIndex: 2 }}></div>

      {/* Bootstrap Container */}
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100 " style={{ position: "relative", zIndex: 3, color: "white" }}>
        <div className="row text-center">
          {/* Diet Plans Button col-md-4 mb-4*/}   
          <div className="pb-3">

            <div
              className="card p-4 shadow-lg border-0 pb-3"
              onClick={() => navigate("/mentor/dashboard/dietplans")}
              style={{ cursor: "pointer", borderRadius: "35px", transition: "0.3s", backgroundColor: "black" }}
            >
              <h3 className="text-white">Diet Plans</h3>
            </div>
          </div>

          {/* Meal Plans Button */}
          <div className="pb-3">
            <div
              className="card p-4 shadow-lg border-0 pb-3"
              onClick={() => navigate("/mentor/dashboard/mealfoods")}
              style={{ cursor: "pointer", borderRadius: "35px", transition: "0.3s", backgroundColor: "black" }}
            >
              <h3 className="text-white">Meal Plans</h3>
            </div>
          </div>

          {/* Partner Orders Button */}
          <div className="">
            <div
              className="card p-4 shadow-lg border-0 pb-3"
              onClick={() => navigate("/partner/orders")}
              style={{ cursor: "pointer", borderRadius: "35px", transition: "0.3s", backgroundColor: "black" }}
            >
              <h3 className="text-white">Partner Orders</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDash;