import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Grid,
  Typography,
  CircularProgress,
  Pagination,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { Article, Category, Tag } from '../../types';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

interface ArticleSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function ArticleSearch({ open, onClose }: ArticleSearchProps) {
  // Search form state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [sortOrder, setSortOrder] = useState<number>(1); // 1 for ascending, -1 for descending

  // Data state
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  // Fetch categories and tags on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/Category`),
          axios.get(`${API_BASE_URL}/Tag`)
        ]);
        setCategories(categoriesResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const payload = {
        pageNumber: page,
        pageSize: pageSize,
        sorting: sortOrder,
        partName: searchQuery,
        categoryIds: selectedCategories.map(cat => cat.id),
        tagIds: selectedTags.map(tag => tag.id)
      };

      const response = await axios.post(`${API_BASE_URL}/Article/filter`, payload);
      setArticles(response.data.items);
      setTotalPages(response.data.pageCount);
    } catch (error) {
      console.error('Error searching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handleSearch();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Search Articles
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                options={categories}
                getOptionLabel={(option) => option.name}
                value={selectedCategories}
                onChange={(_, newValue) => setSelectedCategories(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Categories"
                    size="small"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      size="small"
                    />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                multiple
                options={tags}
                getOptionLabel={(option) => option.name}
                value={selectedTags}
                onChange={(_, newValue) => setSelectedTags(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Tags"
                    size="small"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option.name}
                      {...getTagProps({ index })}
                      size="small"
                    />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Sort by name</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  label="Sort by name"
                >
                  <MenuItem value={1}>A to Z</MenuItem>
                  <MenuItem value={-1}>Z to A</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
              {articles.map((article) => (
                <Grid item xs={12} sm={6} key={article.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{article.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.category?.name}
                      </Typography>
                      <Typography variant="body2" noWrap>
                        {article.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {articles.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
} 