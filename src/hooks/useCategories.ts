import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Category } from '../types/interfaces';
import {
  setCategories,
  setLoading,
  setError,
  setCurrentPage,
  setCurrentCategory,
  fetchCategories as fetchCategoriesThunk,
  addCategory as addCategoryThunk,
  updateCategory as updateCategoryThunk,
  deleteCategory as deleteCategoryThunk,
} from '../redux/slices/categorySlice';
import { toast } from 'react-toastify';

export const useCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    list: categories, 
    loading, 
    error, 
    currentPage,
    currentCategory,
    totalPages,
    totalItems 
  } = useSelector((state: RootState) => state.categories);

  const fetchCategories = useCallback(async (page: number = 1, search: string = '') => {
    try {
      const result = await dispatch(fetchCategoriesThunk({ pageNumber: page, pageSize: 10, search })).unwrap();
      return result;
    } catch (err) {
      toast.error('Failed to fetch categories');
      return null;
    }
  }, [dispatch]);

  const createCategory = useCallback(
    async (category: Omit<Category, 'id'>) => {
      try {
        const result = await dispatch(addCategoryThunk(category)).unwrap();
        toast.success('Category created successfully');
        return result;
      } catch (err) {
        toast.error('Failed to create category');
        return null;
      }
    },
    [dispatch]
  );

  const updateCategoryData = useCallback(
    async (category: Category) => {
      try {
        const result = await dispatch(updateCategoryThunk(category)).unwrap();
        toast.success('Category updated successfully');
        return result;
      } catch (err) {
        toast.error('Failed to update category');
        return null;
      }
    },
    [dispatch]
  );

  const removeCategory = useCallback(
    async (id: number) => {
      try {
        await dispatch(deleteCategoryThunk(id)).unwrap();
        toast.success('Category deleted successfully');
        return true;
      } catch (err) {
        toast.error('Failed to delete category');
        return false;
      }
    },
    [dispatch]
  );

  const selectCategory = useCallback(
    (category: Category | null) => {
      dispatch(setCurrentCategory(category));
    },
    [dispatch]
  );

  const setPage = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  return {
    categories,
    loading,
    error,
    currentPage,
    currentCategory,
    totalPages,
    totalItems,
    fetchCategories,
    createCategory,
    updateCategoryData,
    removeCategory,
    selectCategory,
    setPage,
  };
};
