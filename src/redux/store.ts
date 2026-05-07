// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import articleSlice from './slices/articleSlice';
import categorySlice from './slices/categorySlice';
import tagSlice from './slices/tagSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    articles: articleSlice,
    categories: categorySlice,
    tags: tagSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
