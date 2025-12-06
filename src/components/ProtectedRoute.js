import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuth = Boolean(localStorage.getItem('demo_auth'));
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
