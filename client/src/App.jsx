import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Adjust the path as necessary
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import MentorDashboard from './pages/MentorDashboard';
import AdminPanel from './pages/AdminPanel';
import RegisterMentor from './pages/RegisterMentor';
import CourseDetails from './pages/CourseDetails';
import Payment from './pages/Payment';
import PaymentTest from './pages/PaymentTest';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import DietPlan from './pages/DietPlan';
import Section from './pages/Section';
import Profile from './pages/Profile';
import Meals from './pages/Meals';
import TrainerDash from './pages/TrainerDash';
import SupplierDashboard from './pages/TrainerMeal';
import ManageProductsSupplier from './pages/Product/ManageProducts';
import AddProduct from './pages/Product/AddProduct';
import ShopPage from './pages/ShopPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import Booking from './pages/Booking';
import Nutrision from './pages/Nutrision';
import PartnerOrders from './pages/PartnerOrders';
import Chatbot from './pages/Chatbot'; // Import Chatbot

import FeedbackForm from "./pages/FeedbackForm";


function App() {
  return (
    <>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-trainer" element={<RegisterMentor />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/mentor/dashboard" element={<TrainerDash />} />
          <Route path="/mentor/dashboard/dietplans" element={<MentorDashboard />} />
          <Route path="/mentor/dashboard/mealfoods" element={<SupplierDashboard />} />
          <Route path="/supplier/products" element={<ManageProductsSupplier />} />
          <Route path="/supplier/add-product" element={<AddProduct />} />
          <Route path="/About" element={<About />} />

          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/section/:id" element={<Section />} />
          <Route path="/payment/:courseId/:fee" element={<PaymentTest />} />
          <Route path="/dashboard/mealplans" element={<DietPlan />} />
          <Route path="/dashboard/mealplans/nutrision" element={<Nutrision />} />
          <Route path="/partner/orders" element={<PartnerOrders />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/meals" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
          <Route path="/item/:itemId" element={<ItemDetailsPage />} />
          <Route path="/Shop" element={<ShopPage />} />
          <Route path="/payment/:itemid/:price/product" element={<Booking />} />
          <Route path="/feedback" element={<FeedbackForm />} />
        </Routes>
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </>
  );
}

export default App;
