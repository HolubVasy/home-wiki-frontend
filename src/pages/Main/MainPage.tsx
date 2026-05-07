import React from 'react';
import { Box, Typography, Container, Grid, Paper } from '@mui/material';

export default function MainPage() {
  return (
    <Container>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        mb: 4
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#1976d2'
          }}
        >
          Добро пожаловать в Home Wiki!
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            mb: 6,
            textAlign: 'center',
            color: 'text.secondary',
            maxWidth: 600
          }}
        >
          Ваш личный путеводитель по домашней жизни - от DIY проектов до советов по садоводству, всё в одном месте.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#1976d2',
                  fontWeight: 500
                }}
              >
                Что мы предлагаем
              </Typography>
              <Typography variant="body1" paragraph>
                Откройте для себя множество знаний об обслуживании дома, DIY проектах и улучшении образа жизни.
              </Typography>
              <Typography variant="body1" paragraph>
                Наши статьи тщательно подобраны, чтобы предоставить практические решения и творческие идеи для вашего дома.
              </Typography>
              <Typography variant="body1">
                Просматривайте различные категории, чтобы найти именно то, что вам нужно.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                height: '100%',
                backgroundColor: 'white',
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  color: '#1976d2',
                  fontWeight: 500
                }}
              >
                Как начать
              </Typography>
              <Typography variant="body1" paragraph>
                Переходите по категориям, чтобы найти интересующие вас статьи.
              </Typography>
              <Typography variant="body1" paragraph>
                Используйте теги для быстрого поиска конкретных тем.
              </Typography>
              <Typography variant="body1">
                Создавайте собственные статьи, чтобы делиться своими знаниями с сообществом.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 