import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const HomePage = lazy(() => import('./Pages/Pubic/Home/HomePage.jsx'));
const AdminLogin = lazy(() => import('./Pages/Admin/Login/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./Pages/Admin/Dashboard/AdminDashboard.jsx'));
const ContactPage = lazy(() => import('./Pages/Pubic/Contact/ContactPage.jsx'));
const Login = lazy(() => import('./Pages/Admin/Login/Login.jsx'));
const Register = lazy(() => import('./Pages/Admin/Register/Register.jsx'));

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
          <Route path="/login" element={
            <PageTransition>
              <Login />
            </PageTransition>
          } />
          <Route path="/register" element={
            <PageTransition>
              <Register />
            </PageTransition>
          } />
          

<Route path="/contact" element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          } />
          <Route path="/admin/login" element={
            <PageTransition>
              <AdminLogin />
            </PageTransition>
          } />
          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <PageTransition>
                <AdminDashboard />
              </PageTransition>
            </ProtectedRoute>
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
