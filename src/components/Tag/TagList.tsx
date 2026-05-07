import React, { useEffect, useState } from 'react';
import { useTags } from '#/hooks/useTags';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Box,
  Typography,
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
import { Tag } from '../../types';
import TagEditDialog from './TagEditDialog';

export default function TagList() {
  const {
    tags,
    loading,
    error,
    currentPage,
    totalPages,
    fetchTags,
    removeTag,
    updateTagData,
    setPage,
  } = useTags();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  useEffect(() => {
    fetchTags(currentPage, searchTerm);
  }, [fetchTags, currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setPage(1);
    fetchTags(1, value);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
  };

  const handleEditClose = () => {
    setEditingTag(null);
  };

  const handleEditSave = async (name: string) => {
    if (editingTag) {
      await updateTagData({
        ...editingTag,
        name,
      });
      handleEditClose();
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (loading && !tags.length) {
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
          placeholder="Search tags..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
      </Box>

      <List>
        {tags.map((tag: Tag) => (
          <ListItem 
            key={tag.id} 
            divider
            sx={{
              backgroundColor: '#b9f6ca',
              mb: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#69f0ae',
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }
            }}
          >
            <ListItemText 
              primary={tag.name}
              sx={{ 
                '& .MuiTypography-root': { 
                  fontWeight: 500 
                } 
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEdit(tag)}
                sx={{ mr: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeTag(tag.id)}
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

      <TagEditDialog
        open={!!editingTag}
        tag={editingTag}
        onClose={handleEditClose}
        onSave={handleEditSave}
      />
    </Box>
  );
} 