import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = Boolean(localStorage.getItem('demo_auth'));
  if (!isAuth) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
