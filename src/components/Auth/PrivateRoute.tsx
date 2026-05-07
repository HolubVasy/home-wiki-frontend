import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login page with return URL
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
