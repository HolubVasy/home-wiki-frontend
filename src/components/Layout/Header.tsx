import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from '@mui/icons-material';

export default function Header() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Home wiki
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/articles"
          >
            Articles
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/categories"
          >
            Categories
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/tags"
          >
            Tags
          </Button>
          <IconButton 
            color="inherit"
            onClick={handleSearchClick}
            sx={{ ml: 1 }}
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
