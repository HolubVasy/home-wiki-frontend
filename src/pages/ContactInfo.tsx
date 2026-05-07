import React from 'react';
import { Box, Typography, Paper, Link, Container, Grid } from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';

export default function ContactInfo() {
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
          Контактная информация
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
          Есть вопросы или предложения? Не стесняйтесь обращаться к нам!
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
                Разработчик
              </Typography>
              <Typography variant="h6" paragraph>
                Василий Голуб
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mt: 3
              }}>
                <EmailIcon sx={{ color: '#1976d2' }} />
                <Link 
                  href="mailto:holubvasy@gmail.com"
                  sx={{ 
                    color: '#1976d2',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  holubvasy@gmail.com
                </Link>
              </Box>

              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 4,
                  color: 'text.secondary'
                }}
              >
                Я всегда открыт для обратной связи и предложений по улучшению Home Wiki. Ваш вклад помогает сделать эту платформу лучше для всех.
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
                Время ответа
              </Typography>
              
              <Typography variant="body1" paragraph>
                Я стараюсь отвечать на все запросы в течение 24-48 часов в рабочие дни.
              </Typography>

              <Typography variant="body1" paragraph>
                Для срочных вопросов, пожалуйста, укажите "СРОЧНО" в теме письма.
              </Typography>

              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 'auto',
                  color: 'text.secondary'
                }}
              >
                Примечание: Эта контактная информация предназначена только для вопросов, связанных с приложением и бизнесом.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 