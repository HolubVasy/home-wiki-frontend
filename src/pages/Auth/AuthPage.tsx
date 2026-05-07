import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Login from '../../components/Auth/Login';
import Register from '../../components/Auth/Register';
import { useAuth } from '../../hooks/useAuth';

export default function AuthPage() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Determine which form to show based on the path
  const isLoginPath = location.pathname === '/auth/login';

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>{isLoginPath ? <Login /> : <Register />}</Box>
    </Container>
  );
}
