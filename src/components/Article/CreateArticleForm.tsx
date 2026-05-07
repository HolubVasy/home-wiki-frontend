import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Autocomplete,
  Chip,
  Button,
  Typography,
  Paper,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  CircularProgress,
  Snackbar
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { Category, Tag } from '../../types';

const API_BASE_URL = 'https://homewiki.azurewebsites.net/api';

interface CreateArticleFormProps {
  onClose: () => void;
  initialCategoryId?: string;
  initialTagId?: string;
}

interface ArticleRequestDto {
  name: string;
  description: string;
  categoryId: number;
  tagIds: number[];
  createdBy: string;
  modifiedBy: string;
}

interface ErrorResponse {
  message: string;
  status: number;
}

interface ApiResponse<T> {
  items: T[];
  pageCount: number;
  totalItemCount: number;
  pageNumber: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export default function CreateArticleForm({ 
  onClose,
  initialCategoryId,
  initialTagId
}: CreateArticleFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const [categoriesResponse, tagsResponse] = await Promise.all([
          axios.get<ApiResponse<Category>>(`${API_BASE_URL}/category/search?name=&pageNumber=1&pageSize=100`),
          axios.get<ApiResponse<Tag>>(`${API_BASE_URL}/tag/search?name=&pageNumber=1&pageSize=100`)
        ]);

        if (categoriesResponse.data?.items && tagsResponse.data?.items) {
          setCategories(categoriesResponse.data.items);
          setTags(tagsResponse.data.items);

          if (initialCategoryId) {
            const categoryIdNumber = parseInt(initialCategoryId, 10);
            const category = categoriesResponse.data.items.find(
              (c: Category) => c.id === categoryIdNumber
            );
            if (category) setSelectedCategory(category);
          }

          if (initialTagId) {
            const tagIdNumber = parseInt(initialTagId, 10);
            const tag = tagsResponse.data.items.find(
              (t: Tag) => t.id === tagIdNumber
            );
            if (tag) setSelectedTags([tag]);
          }
        }
      } catch (err) {
        const error = err as AxiosError<ErrorResponse>;
        setError(error.response?.data?.message || 'Failed to load form data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [initialCategoryId, initialTagId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedCategory) {
      setError('Please select a category');
      return;
    }

    try {
      setError(null);
      const articleData: ArticleRequestDto = {
        name,
        description,
        categoryId: selectedCategory.id,
        tagIds: selectedTags.map(tag => tag.id),
        createdBy: 'User',
        modifiedBy: 'User'
      };

      await axios.post(`${API_BASE_URL}/article`, articleData);
      onClose();
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setError(error.response?.data?.message || 'Failed to create article');
      console.error('Error creating article:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading form...</Typography>
      </Box>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        maxWidth: 600,
        mx: 'auto',
        mt: 2
      }}
    >
      <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
        Create New Article
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Article Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          required
          fullWidth
          multiline
          rows={4}
        />

        <Autocomplete<Category, false>
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          options={categories}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              required
            />
          )}
        />

        <Autocomplete<Tag, true>
          multiple
          value={selectedTags}
          onChange={(_, newValue) => setSelectedTags(newValue)}
          options={tags}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              placeholder="Select tags"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const props = getTagProps({ index });
              return (
                <Chip
                  label={option.name}
                  {...props}
                  sx={{ 
                    backgroundColor: '#e0f2f1',
                    '&:hover': { backgroundColor: '#b2dfdb' }
                  }}
                />
              );
            })
          }
        />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button 
            variant="outlined" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="success"
          >
            Create Article
          </Button>
        </Box>
      </Box>
    </Paper>
  );
} 