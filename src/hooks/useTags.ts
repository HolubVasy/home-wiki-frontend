import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Tag } from '../types/interfaces';
import {
  setTags,
  setLoading,
  setError,
  setCurrentPage,
  setCurrentTag,
  fetchTags as fetchTagsThunk,
  addTag as addTagThunk,
  updateTag as updateTagThunk,
  deleteTag as deleteTagThunk,
} from '../redux/slices/tagSlice';
import { toast } from 'react-toastify';

export const useTags = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    list: tags, 
    loading, 
    error, 
    currentPage,
    currentTag,
    totalPages,
    totalItems 
  } = useSelector((state: RootState) => state.tags);

  const fetchTags = useCallback(async (page: number = 1, search: string = '') => {
    try {
      const result = await dispatch(fetchTagsThunk({ pageNumber: page, pageSize: 10, search })).unwrap();
      return result;
    } catch (err) {
      toast.error('Failed to fetch tags');
      return null;
    }
  }, [dispatch]);

  const createTag = useCallback(
    async (tag: Omit<Tag, 'id'>) => {
      try {
        const result = await dispatch(addTagThunk(tag)).unwrap();
        toast.success('Tag created successfully');
        return result;
      } catch (err) {
        toast.error('Failed to create tag');
        return null;
      }
    },
    [dispatch]
  );

  const updateTagData = useCallback(
    async (tag: Tag) => {
      try {
        const result = await dispatch(updateTagThunk(tag)).unwrap();
        toast.success('Tag updated successfully');
        return result;
      } catch (err) {
        toast.error('Failed to update tag');
        return null;
      }
    },
    [dispatch]
  );

  const removeTag = useCallback(
    async (id: number) => {
      try {
        await dispatch(deleteTagThunk(id)).unwrap();
        toast.success('Tag deleted successfully');
        return true;
      } catch (err) {
        toast.error('Failed to delete tag');
        return false;
      }
    },
    [dispatch]
  );

  const selectTag = useCallback(
    (tag: Tag | null) => {
      dispatch(setCurrentTag(tag));
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
    tags,
    loading,
    error,
    currentPage,
    currentTag,
    totalPages,
    totalItems,
    fetchTags,
    createTag,
    updateTagData,
    removeTag,
    selectTag,
    setPage,
  };
};
