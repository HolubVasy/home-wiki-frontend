import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Snackbar,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { Article, Category, Tag } from '../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function EditArticle() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState<{
    id: number;
    name: string;
    description: string;
    categoryId: number;
    tagIds: number[];
  }>({
    id: 0,
    name: '',
    description: '',
    categoryId: 0,
    tagIds: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch article data
        const articleResponse = await axios.get(`https://homewiki.azurewebsites.net/api/article/${id}`);
        const article = articleResponse.data;

        // Log the received article data for debugging
        console.log('Received article data:', article);

        // Fetch categories
        const categoriesResponse = await axios.get('https://homewiki.azurewebsites.net/api/category/search?name=&pageNumber=1&pageSize=100');
        const categoriesData = categoriesResponse.data.items;

        // Log categories for debugging
        console.log('Received categories:', categoriesData);

        // Fetch tags
        const tagsResponse = await axios.get('https://homewiki.azurewebsites.net/api/tag/search?name=&pageNumber=1&pageSize=100');
        const tagsData = tagsResponse.data.items;

        setCategories(categoriesData);
        setTags(tagsData);
        setFormData({
          id: article.id,
          name: article.name,
          description: article.description,
          categoryId: article.category?.id || 0,
          tagIds: article.tags?.map((tag: Tag) => tag.id) || [],
        });
      } catch (error: any) {
        console.error('Error fetching data:', error);
        if (error.response) {
          switch (error.response.status) {
            case 404:
              navigate('/404');
              break;
            case 400:
              navigate('/400');
              break;
            case 500:
              navigate('/500');
              break;
            default:
              setError('Failed to load data');
          }
        } else {
          navigate('/500');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      const requestData = {
        id: formData.id,
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId === 0 ? null : formData.categoryId,
        tagIds: formData.tagIds,
        createdBy: 'system',
        modifiedBy: 'system'
      };

      await axios.put('https://homewiki.azurewebsites.net/api/article', requestData);

      setSnackbar({
        open: true,
        message: 'Статья успешно обновлена',
        severity: 'success'
      });

      // Задержка перед переходом
      setTimeout(() => {
        navigate(`/articles/${id}`);
      }, 1500);

    } catch (error: any) {
      console.error('Error updating article:', error);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setSnackbar({
              open: true,
              message: 'Ошибка валидации: ' + JSON.stringify(error.response.data.errors),
              severity: 'error'
            });
            break;
          case 500:
            navigate('/500');
            break;
          default:
            setSnackbar({
              open: true,
              message: 'Не удалось обновить статью',
              severity: 'error'
            });
        }
      } else {
        setSnackbar({
          open: true,
          message: 'Не удалось обновить статью',
          severity: 'error'
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(`/articles/${id}`);
  };

  if (loading) {
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
        <Link 
          color="inherit" 
          href={`/articles/${id}`}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/articles/${id}`);
          }}
          sx={{ textDecoration: 'none' }}
        >
          {formData.name}
        </Link>
        <Typography color="text.primary">Edit</Typography>
      </Breadcrumbs>

      <Paper 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          p: 3,
          backgroundColor: '#e0f2f1',
          borderRadius: 1,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Article
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <TextField
            label="Title"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            fullWidth
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            fullWidth
            multiline
            rows={4}
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId || 0}
              onChange={(e) => {
                const newValue = e.target.value as number;
                console.log('Selected category:', newValue);
                console.log('Available categories:', categories);
                setFormData({ ...formData, categoryId: newValue });
              }}
              label="Category"
            >
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={formData.tagIds}
              onChange={(e) => setFormData({ 
                ...formData, 
                tagIds: e.target.value as number[] 
              })}
              input={<OutlinedInput label="Tags" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((tagId) => {
                    const tag = tags.find(t => t.id === tagId);
                    return tag ? (
                      <Chip 
                        key={tag.id} 
                        label={tag.name} 
                        sx={{ backgroundColor: '#80cbc4' }}
                      />
                    ) : null;
                  })}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={handleCancel}
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            borderRadius: 1,
            '& .MuiAlert-message': {
              fontSize: '1rem'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 