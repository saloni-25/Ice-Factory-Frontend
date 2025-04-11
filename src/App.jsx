import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Order = lazy(() => import('./Pages/Public/Orders/Order.jsx'));
const OrderDetails = lazy(() => import('./Pages/Public/Orders/OrderDetails.jsx'));
const OrderHistory = lazy(() => import('./Pages/Public/Orders/OrderHistory.jsx'));
const HomePage = lazy(() => import('./Pages/Public/HomePage/HomePage.jsx'));
const AdminDashboard = lazy(() => import('./Pages/Admin/pages/Dashboard.jsx'));
const AdminOrederRequests = lazy(() => import('./Pages/Admin/pages/OrderRequest.jsx'));
const AdminOrederToBeDelivered = lazy(() => import('./Pages/Admin/pages/OrdersToBeDelivered.jsx'));
const AdminSalesReport = lazy(() => import('./Pages/Admin/pages/SalesReport.jsx'));
// Add missing components
const LoadingBar = () => (
  <div className="loading-bar">
    <div className="spinner"></div>
    <p>Loading...</p>
  </div>
);

const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

const ProtectedRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  if (!isAdmin) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingBar />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } />
          <Route path="/orders" element={
            <PageTransition>
              <Order />
            </PageTransition>
          } />
          <Route path="/order-details" element={
            <PageTransition>
              <OrderDetails />
            </PageTransition>
          } />
          <Route path="/order-history" element={
            <PageTransition>
              <OrderHistory />
            </PageTransition>
          } />
          {/* Add other routes as needed */}
          <Route path="/admin-dashboard" element={
            <PageTransition>
              <AdminDashboard />
            </PageTransition>
          } />
          <Route path="/admin-order-request" element={
            <PageTransition>
            <AdminOrederRequests/>
            </PageTransition>
          } />
          <Route path="/admin-tobe-delivered" element={
            <PageTransition>
              <AdminOrederToBeDelivered />
            </PageTransition>
          } />
          <Route path="/sales-report" element={
            <PageTransition>
              <AdminSalesReport />
            </PageTransition>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App
