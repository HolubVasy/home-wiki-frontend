// src/pages/Article/ArticleDetails.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ArticleService } from '../../api/ArticleService';
import { setCurrentArticle } from '../../redux/slices/articleSlice';

export default function ArticleDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentArticle, loading } = useAppSelector(state => state.articles);

  useEffect(() => {
    if (id) {
      dispatch(setCurrentArticle(null));
      // Пример ручного вызова сервиса
      ArticleService.getById(Number(id)).then(article => {
        dispatch(setCurrentArticle(article));
      });
    }
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!currentArticle) {
    return <Typography>Загрузка статьи или статья не найдена...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {currentArticle.name}
      </Typography>
      <Typography sx={{ mt: 2 }}>{currentArticle.description}</Typography>
      <Typography sx={{ mt: 2 }}>Категория: {currentArticle.category?.name}</Typography>
      {/* Можно добавить список тегов и т.д. */}
    </Container>
  );
}
