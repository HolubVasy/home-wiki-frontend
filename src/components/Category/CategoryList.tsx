import React, { useEffect, useState } from 'react';
import { useCategories } from '#/hooks/useCategories';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Box,
  Typography,
  Chip,
  CircularProgress,
  Pagination,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Search as SearchIcon } from '@mui/icons-material';
import { Category } from '../../types';
import CategoryEditDialog from './CategoryEditDialog';

export default function CategoryList() {
  const {
    categories,
    loading,
    error,
    currentPage,
    totalPages,
    fetchCategories,
    removeCategory,
    updateCategoryData,
    setPage,
  } = useCategories();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchCategories(currentPage, searchTerm);
  }, [fetchCategories, currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(1);
    fetchCategories(1, value);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleEditClose = () => {
    setEditingCategory(null);
  };

  const handleEditSave = async (name: string, description?: string) => {
    if (editingCategory) {
      await updateCategoryData({
        ...editingCategory,
        name,
        description: description || editingCategory.description,
      });
      handleEditClose();
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading && !categories.length) {
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
    <Box>
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <List>
        {categories.map((category: Category) => (
          <ListItem key={category.id} divider>
            <ListItemText primary={category.name} secondary={category.description} />
            <Box mr={2}>
              <Chip
                label={`${category.articleCount} articles`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(category)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeCategory(category.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      <CategoryEditDialog
        open={!!editingCategory}
        category={editingCategory}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
    </Box>
  );
}
