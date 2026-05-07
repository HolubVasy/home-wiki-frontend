import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  CircularProgress, 
  Box,
  Pagination,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchArticles } from '../../redux/slices/articleSlice';
import { Link } from 'react-router-dom';

export default function Articles() {
  const dispatch = useAppDispatch();
  const { list, loading, error, totalPages, currentPage } = useAppSelector(state => state.articles);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchArticles({ pageNumber: currentPage, pageSize: 10 }));
  }, [dispatch, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchArticles({ pageNumber: 1, pageSize: 10, search: searchTerm }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(fetchArticles({ pageNumber: value, pageSize: 10, search: searchTerm }));
  };

  if (loading && !list.length) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Articles List
      </Typography>

      <Box sx={{ mt: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {list.map(article => (
        <Box key={article.id} sx={{ mb: 2 }}>
          <Typography variant="h6">
            <Link to={`/articles/${article.id}`}>{article.name}</Link>
          </Typography>
          <Typography variant="body2">{article.description}</Typography>
        </Box>
      ))}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
