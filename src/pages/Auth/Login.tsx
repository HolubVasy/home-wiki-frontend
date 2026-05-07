// src/pages/Auth/Login.tsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Вход
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          sx={{ mt: 2 }}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          required
          sx={{ mt: 2 }}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>
    </Container>
  );
}
