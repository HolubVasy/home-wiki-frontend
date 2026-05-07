import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  NavigateNext as NavigateNextIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import axios from 'axios';
import DeleteArticleDialog from '../components/Article/DeleteArticleDialog';
import { ArticleService } from '../api/ArticleService';

// Define the API article type
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

export default function ArticleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ApiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`https://homewiki.azurewebsites.net/api/Article/${id}`);
        
        if (!response.data) {
          navigate('/404');
          return;
        }
        
        setArticle(response.data);
      } catch (error: any) {
        console.error('Error fetching article:', error);
        
        // Check if it's a 404 error
        if (error.response && error.response.status === 404) {
          navigate('/404');
          return;
        }
        
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, navigate]);

  const handleEdit = () => {
    navigate(`/articles/${id}/edit`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Use a direct axios call with the exact URL format from the example
      await axios.delete(`https://homewiki.azurewebsites.net/api/Article/${id}`);
      console.log(`Deleting article with ID: ${id}`);
      
      // Show success notification
      setNotification({
        open: true,
        message: 'Статья успешно удалена',
        severity: 'success'
      });
      
      // Navigate back to articles list after a short delay
      setTimeout(() => {
        navigate('/articles');
      }, 1500);
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Failed to delete article');
      setNotification({
        open: true,
        message: 'Ошибка при удалении статьи',
        severity: 'error'
      });
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box p={3}>
        <Typography color="error">{error || 'Article not found'}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link 
          color="inherit" 
          href="/articles" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/articles');
          }}
          sx={{ textDecoration: 'none' }}
        >
          Articles
        </Link>
        <Typography color="text.primary">{article.name}</Typography>
      </Breadcrumbs>

      <Paper 
        sx={{ 
          p: 3,
          backgroundColor: '#e0f2f1',
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {article.name}
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ mr: 1 }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
            >
              Delete
            </Button>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
          {article.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Category:
          </Typography>
          <Chip 
            label={article.category?.name || 'Uncategorized'} 
            sx={{ backgroundColor: '#4db6ac', color: 'white' }}
          />
        </Box>

        {article.tags && article.tags.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Tags:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {article.tags.map((tag) => (
                <Chip 
                  key={tag.id} 
                  label={tag.name}
                  sx={{ backgroundColor: '#80cbc4' }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Created by: {article.createdBy}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(article.createdAt).toLocaleDateString()}
          </Typography>
          {article.modifiedBy && (
            <>
              <Typography variant="caption" color="text.secondary">
                Modified by: {article.modifiedBy}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Modified: {new Date(article.modifiedAt!).toLocaleDateString()}
              </Typography>
            </>
          )}
        </Box>
      </Paper>

      <DeleteArticleDialog
        open={deleteDialogOpen}
        article={article}
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
