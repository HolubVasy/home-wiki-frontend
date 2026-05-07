import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  IconButton,
  Box
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import ArticleSearch from '../Article/ArticleSearch';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Typography 
            variant="h6" 
            component={Link} 
            to="/" 
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit',
              fontWeight: 'bold' 
            }}
          >
            Home Wiki
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/articles"
              sx={{ fontWeight: 'medium' }}
            >
              Articles
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/categories"
              sx={{ fontWeight: 'medium' }}
            >
              Categories
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/tags"
              sx={{ fontWeight: 'medium' }}
            >
              Tags
            </Button>
            <IconButton 
              color="inherit"
              onClick={() => setIsSearchOpen(true)}
              sx={{ 
                ml: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <ArticleSearch 
        open={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </Box>
  );
} 