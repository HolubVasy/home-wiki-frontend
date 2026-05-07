import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Error500() {
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
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
        <Typography variant="h1" component="h1" gutterBottom>
          500
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Внутренняя ошибка сервера
        </Typography>
        <Typography color="text.secondary" paragraph>
          Извините, произошла внутренняя ошибка сервера. Мы уже работаем над её устранением.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
          >
            Обновить страницу
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
          >
            На главную
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 