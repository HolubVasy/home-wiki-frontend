import React, { useState, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Typography, 
  Chip, 
  Grid, 
  Pagination,
  CircularProgress,
  Alert,
  Button,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import { Autocomplete } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import axios from 'axios';
import { Article, Category, Tag } from '../types';
import { Link } from 'react-router-dom';

interface SearchResponse {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: Article[];
}

interface SearchParams {
  pageNumber: number;
  pageSize: number;
  sorting: number;
  partName: string;
  categoryIds: number[];
  tagIds: number[];
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

export default function Search() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    pageNumber: 1,
    pageSize: 10,
    sorting: 0,
    partName: '',
    categoryIds: [],
    tagIds: []
  });
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post<SearchResponse>(
        `${API_BASE_URL}/Article/filter`,
        {
          ...searchParams,
          categoryIds: selectedCategory ? [selectedCategory.id] : [],
          tagIds: selectedTags.map(tag => tag.id)
        }
      );
      
      setSearchResults(response.data.items);
      setTotalPages(response.data.pageCount);
    } catch (error) {
      console.error('Error searching articles:', error);
      setError('Failed to search articles');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories and tags on component mount and perform initial search
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/category/search?name=&pageNumber=1&pageSize=100`),
          axios.get(`${API_BASE_URL}/tag/search?name=&pageNumber=1&pageSize=100`)
        ]);
        
        if (categoriesResponse.data?.items && tagsResponse.data?.items) {
          setCategories(categoriesResponse.data.items);
          setTags(tagsResponse.data.items);
        }
        
        // Perform initial search after fetching categories and tags
        await handleSearch();
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load categories and tags');
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  const handleReset = () => {
    setSearchParams({
      pageNumber: 1,
      pageSize: 10,
      sorting: 0,
      partName: '',
      categoryIds: [],
      tagIds: []
    });
    setSelectedCategory(null);
    setSelectedTags([]);
    handleSearch(); // Perform search after reset to show all articles
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams(prev => ({ ...prev, pageNumber: value }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Trigger search when page changes
  useEffect(() => {
    if (searchParams.pageNumber > 1) {
      handleSearch();
    }
  }, [searchParams.pageNumber]);

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        Advanced Search
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'flex-start',
          flexWrap: { xs: 'wrap', md: 'nowrap' }
        }}>
          <TextField
            label="Search by name"
            variant="outlined"
            size="small"
            value={searchParams.partName}
            onChange={(e) => setSearchParams(prev => ({ ...prev, partName: e.target.value }))}
            onKeyPress={handleKeyPress}
            sx={{ minWidth: { xs: '100%', md: '300px' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    edge="end"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: { xs: '100%', md: '200px' } }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory?.id || ''}
              label="Category"
              onChange={(e) => {
                const categoryId = e.target.value as number;
                const category = categories.find(c => c.id === categoryId) || null;
                setSelectedCategory(category);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: { xs: '100%', md: '150px' } }}>
            <InputLabel>Sorting</InputLabel>
            <Select
              value={searchParams.sorting}
              label="Sorting"
              onChange={(e) => setSearchParams(prev => ({ ...prev, sorting: e.target.value as number }))}
            >
              <MenuItem value={0}>No sorting</MenuItem>
              <MenuItem value={1}>Ascending</MenuItem>
              <MenuItem value={2}>Descending</MenuItem>
            </Select>
          </FormControl>

          <Autocomplete
            multiple
            size="small"
            options={tags}
            getOptionLabel={(option) => option.name}
            value={selectedTags}
            onChange={(_, newValue) => setSelectedTags(newValue)}
            sx={{ 
              minWidth: { xs: '100%', md: '300px' },
              flex: 1
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Select tags"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                  size="small"
                  sx={{ backgroundColor: '#e0f2f1' }}
                />
              ))
            }
          />

          <Button 
            variant="outlined"
            onClick={handleReset}
            startIcon={<ClearIcon />}
            size="small"
            sx={{ 
              minWidth: { xs: '100%', md: 'auto' },
              whiteSpace: 'nowrap',
              height: '40px'
            }}
          >
            Clear Search
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress />
        </Box>
      ) : searchResults.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {searchResults.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article.id}>
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
                    <Typography 
                      variant="h6" 
                      component={Link}
                      to={`/articles/${article.id}`}
                      sx={{ 
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {article.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mt: 1,
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {article.description}
                    </Typography>
                    <Box sx={{ mt: 'auto' }}>
                      {article.category && (
                        <Chip 
                          label={article.category.name} 
                          size="small" 
                          sx={{ mb: 1, mr: 1, backgroundColor: '#bbdefb' }}
                        />
                      )}
                      <Typography variant="caption" display="block" color="text.secondary">
                        Created: {new Date(article.createdAt).toLocaleDateString()}
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
                page={searchParams.pageNumber} 
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No results found. Try adjusting your search criteria.
          </Typography>
        </Box>
      )}
    </Box>
  );
} 