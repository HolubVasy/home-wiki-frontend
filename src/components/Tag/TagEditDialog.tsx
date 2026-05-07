import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { Tag } from '../../types';

interface TagEditDialogProps {
  open: boolean;
  tag: Tag | null;
  onClose: () => void;
  onSave: (name: string) => Promise<void>;
}

const TagEditDialog: React.FC<TagEditDialogProps> = ({ open, tag, onClose, onSave }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (tag) {
      setName(tag.name);
    }
  }, [tag]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSave(name);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{tag ? 'Edit Tag' : 'Create Tag'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tag Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TagEditDialog; 