import axiosClient from './axiosClient';
import { Category, PagedList } from '../types/interfaces';

export const CategoryService = {
  async getCategories(): Promise<Category[]> {
    const response = await axiosClient.get<Category[]>('/Category');
    return response.data;
  },

  async searchCategories(
    name: string,
    pageNumber = 1,
    pageSize = 10
  ): Promise<PagedList<Category>> {
    const response = await axiosClient.get<PagedList<Category>>('/Category/search', {
      params: { name, pageNumber, pageSize },
    });
    return response.data;
  },

  async getById(id: number): Promise<Category> {
    const response = await axiosClient.get<Category>(`/Category/${id}`);
    return response.data;
  },

  async create(category: Partial<Category>): Promise<Category> {
    const response = await axiosClient.post<Category>('/Category', category);
    return response.data;
  },

  async update(category: Partial<Category>): Promise<Category> {
    const response = await axiosClient.put<Category>('/Category', category);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/Category/${id}`);
  },
};
