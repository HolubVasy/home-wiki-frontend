// src/pages/About.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        О нашем приложении
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Здесь можно рассказать о проекте, кто автор, какая цель и т.д.
      </Typography>
    </Container>
  );
}
