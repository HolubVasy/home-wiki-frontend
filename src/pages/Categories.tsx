import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
}

interface CategoryResponse {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: Category[];
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchCategories = React.useCallback(async (pageNumber: number, search: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchParam = `name=${encodeURIComponent(search)}`;
      const response = await axios.get<CategoryResponse>(
        `${API_BASE_URL}/category/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      
      if (response.data) {
        setCategories(response.data.items);
        setTotalPages(response.data.pageCount || 1);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchCategories(1, '');
  }, [fetchCategories]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchCategories(1, searchQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchCategories(value, searchQuery);
  };

  if (loading && !categories.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '100%',
      backgroundColor: 'white',
      borderRadius: 1,
      p: 3
    }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Categories
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ mr: 2 }}>Search by name:</Typography>
        <TextField
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          sx={{ width: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton 
                  size="small"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setSearchQuery('');
            setPage(1);
            fetchCategories(1, '');
          }}
          sx={{ 
            ml: 2,
            height: 40,
            textTransform: 'none'
          }}
        >
          Clear Search
        </Button>
      </Box>

      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {category.name}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="body2" color="text.secondary">
                    Created by: {category.createdBy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created at: {new Date(category.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
} 