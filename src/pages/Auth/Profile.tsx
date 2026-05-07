// src/pages/Profile.tsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '#/redux/hooks';
import { logout } from '#/redux/slices/authSlice';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Profile
      </Typography>
      <Typography>Name: {user.displayName}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Profile;
