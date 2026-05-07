// src/pages/CategoryDetails.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Category } from '../../types';
import { CategoryService } from '#/api/CategoryService';

export default function CategoryDetails() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      CategoryService.getById(Number(id))
        .then(setCategory)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!category) {
    return <Typography>Категория не найдена</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {category.name}
      </Typography>
      <Typography sx={{ mt: 2 }}>{category.description}</Typography>
    </Container>
  );
}
