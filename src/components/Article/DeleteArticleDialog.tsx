import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

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

interface DeleteArticleDialogProps {
  open: boolean;
  article: ApiArticle | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteArticleDialog: React.FC<DeleteArticleDialogProps> = ({
  open,
  article,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        Подтверждение удаления
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Удалить статью "{article?.name}"?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Нет</Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteArticleDialog; 