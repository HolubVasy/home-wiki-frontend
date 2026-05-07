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
  Fab,
  CircularProgress,
  Alert,
  CardActions,
  Button,
  Menu,
  MenuItem,
  Snackbar
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DeleteArticleDialog from '../components/Article/DeleteArticleDialog';
import { ArticleService } from '../api/ArticleService';

// Define the API response type
interface ApiArticle {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
  };
  tags: any[];
  createdBy: string;
  createdAt: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
}

interface ApiArticleResponse {
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: ApiArticle[];
}

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

export default function Articles() {
  const [articles, setArticles] = useState<ApiArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<ApiArticle | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<ApiArticle | null>(null);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const fetchArticles = React.useCallback(async (pageNumber: number, search: string) => {
    try {
      setLoading(true);
      setError(null);
      const searchParam = `name=${encodeURIComponent(search)}`;
      const response = await axios.get<ApiArticleResponse>(
        `${API_BASE_URL}/Article/search?${searchParam}&pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      
      if (response.data) {
        setArticles(response.data.items);
        setTotalPages(response.data.pageCount || 1);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchArticles(1, '');
  }, [fetchArticles]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    fetchArticles(1, searchQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    fetchArticles(value, searchQuery);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, article: ApiArticle) => {
    setAnchorEl(event.currentTarget);
    setSelectedArticle(article);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedArticle(null);
  };

  const handleView = (article: ApiArticle) => {
    handleMenuClose();
    navigate(`/articles/${article.id}`);
  };

  const handleUpdate = (article: ApiArticle) => {
    handleMenuClose();
    navigate(`/articles/${article.id}/edit`);
  };

  const handleDeleteClick = (article: ApiArticle) => {
    setArticleToDelete(article);
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;
    
    try {
      await axios.delete(`https://homewiki.azurewebsites.net/api/Article/${articleToDelete.id}`);
      console.log(`Deleting article with ID: ${articleToDelete.id}`);
      
      setArticles(articles.filter(a => a.id !== articleToDelete.id));
      setDeleteDialogOpen(false);
      setArticleToDelete(null);
      
      setNotification({
        open: true,
        message: 'Статья успешно удалена',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      setNotification({
        open: true,
        message: 'Ошибка при удалении статьи',
        severity: 'error'
      });
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setArticleToDelete(null);
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (loading && !articles.length) {
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
        Articles
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
            fetchArticles(1, '');
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
        {articles.map((article) => (
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h2">
                    {article.name}
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={(e) => handleMenuOpen(e, article)}
                    sx={{ 
                      ml: 1,
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {article.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Typography variant="body2" color="primary">
                    Category: {' '}
                    {article.category ? (
                      <RouterLink 
                        to={`/categories/${article.category.name.toLowerCase()}`}
                        style={{ 
                          color: 'inherit',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = 'none';
                        }}
                      >
                        {article.category.name}
                      </RouterLink>
                    ) : (
                      'Uncategorized'
                    )}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created by: {article.createdBy}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created at: {new Date(article.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleView(selectedArticle!)}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View
        </MenuItem>
        <MenuItem onClick={() => handleUpdate(selectedArticle!)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Update
        </MenuItem>
        <MenuItem onClick={() => handleDeleteClick(selectedArticle!)} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

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

      <Fab 
        color="primary" 
        component={RouterLink}
        to="/articles/create"
        sx={{ 
          position: 'fixed',
          bottom: 32,
          right: 32
        }}
      >
        <AddIcon />
      </Fab>

      <DeleteArticleDialog
        open={deleteDialogOpen}
        article={articleToDelete}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            '& .MuiAlert-message': {
              fontSize: '0.875rem',
              fontWeight: 500
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
