// src/pages/TagDetails.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Tag } from '../../types';
import { TagService } from '#/api/TagService';

export default function TagDetails() {
  const { id } = useParams<{ id: string }>();
  const [tag, setTag] = useState<Tag | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      TagService.getById(Number(id))
        .then(data => setTag(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }
  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  if (!tag) {
    return (
      <Container>
        <Typography>Тег не найден</Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {tag.name}
      </Typography>
      <Typography sx={{ mt: 2 }}>
        Создан: {tag.createdAt} пользователем {tag.createdBy}
      </Typography>
      {/* Дополнительная информация по необходимости */}
    </Container>
  );
}
