import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';

export default function Error400() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'warning.main', mb: 2 }} />
        <Typography variant="h1" component="h1" gutterBottom>
          400
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Некорректный запрос
        </Typography>
        <Typography color="text.secondary" paragraph>
          Извините, но ваш запрос содержит ошибку или неверные данные.
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Вернуться на главную
        </Button>
      </Box>
    </Container>
  );
} 