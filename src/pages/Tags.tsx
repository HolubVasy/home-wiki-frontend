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

interface Tag {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
}

interface TagResponse {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: Tag[];
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

export default function Tags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const fetchTags = React.useCallback(async (pageNumber: number, search: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchParam = `name=${encodeURIComponent(search)}`;
      const response = await axios.get<TagResponse>(
        `${API_BASE_URL}/tag/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      
      if (response.data) {
        setTags(response.data.items);
        setTotalPages(response.data.pageCount || 1);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      setError('Failed to load tags');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTags(1, '');
  }, [fetchTags]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchTags(1, searchQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchTags(value, searchQuery);
  };

  if (loading && !tags.length) {
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
        Tags
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
            fetchTags(1, '');
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
        {tags.map((tag) => (
          <Grid item xs={12} sm={6} md={3} key={tag.id}>
            <Card 
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#b9f6ca',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {tag.name}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="body2" color="text.secondary">
                    Created by: {tag.createdBy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created at: {new Date(tag.createdAt).toLocaleDateString()}
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