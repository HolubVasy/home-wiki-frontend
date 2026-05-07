// src/pages/Home.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Добро пожаловать в HomeWiki!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Это главная страница (статическая).
      </Typography>
    </Container>
  );
}
