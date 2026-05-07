import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

export default function Profile() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">User profile information will be displayed here.</Typography>
        </Paper>
      </Box>
    </Container>
  );
}
