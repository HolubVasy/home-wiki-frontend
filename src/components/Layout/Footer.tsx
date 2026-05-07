import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#1976d2',
        color: 'white',
        py: 3,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Documents
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link 
                href="/articles" 
                color="inherit" 
                sx={{ 
                  mb: 1,
                  '&:hover': { 
                    color: '#bbdefb' 
                  } 
                }}
              >
                Articles
              </Link>
              <Link 
                href="/categories" 
                color="inherit" 
                sx={{ 
                  mb: 1,
                  '&:hover': { 
                    color: '#bbdefb' 
                  } 
                }}
              >
                Categories
              </Link>
              <Link 
                href="/tags" 
                color="inherit" 
                sx={{ 
                  '&:hover': { 
                    color: '#bbdefb' 
                  } 
                }}
              >
                Tags
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link 
                href="/" 
                color="inherit" 
                sx={{ 
                  mb: 1,
                  '&:hover': { 
                    color: '#bbdefb' 
                  } 
                }}
              >
                Home
              </Link>
              <Link 
                href="/contact" 
                color="inherit" 
                sx={{ 
                  mb: 1,
                  '&:hover': { 
                    color: '#bbdefb' 
                  } 
                }}
              >
                Contact info
              </Link>
              <Link 
                href="/terms" 
                color="inherit" 
                sx={{ 
                  '&:hover': { 
                    color: '#bbdefb' 
                  } 
                }}
              >
                Terms of use
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
