import axiosClient from './axiosClient';
import { Tag, PagedList } from '../types/interfaces';

export const TagService = {
  async getTags(): Promise<Tag[]> {
    const response = await axiosClient.get<Tag[]>('/Tag');
    return response.data;
  },

  async searchTags(name: string, pageNumber = 1, pageSize = 10): Promise<PagedList<Tag>> {
    const response = await axiosClient.get<PagedList<Tag>>('/Tag/search', {
      params: { name, pageNumber, pageSize },
    });
    return response.data;
  },

  async getById(id: number): Promise<Tag> {
    const response = await axiosClient.get<Tag>(`/Tag/${id}`);
    return response.data;
  },

  async create(tag: Partial<Tag>): Promise<Tag> {
    const response = await axiosClient.post<Tag>('/Tag', tag);
    return response.data;
  },

  async update(tag: Partial<Tag>): Promise<Tag> {
    const response = await axiosClient.put<Tag>('/Tag', tag);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/Tag/${id}`);
  },
};
