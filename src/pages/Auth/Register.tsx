// src/pages/Auth/Register.tsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { register } from '../../redux/slices/authSlice'; // аналогичный thunk, надо написать
import { Navigate } from 'react-router-dom';

export default function Register() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading, error } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ email, password, displayName }));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Display Name"
          fullWidth
          required
          sx={{ mt: 2 }}
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
        />
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
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </Button>
      </form>
    </Container>
  );
}
