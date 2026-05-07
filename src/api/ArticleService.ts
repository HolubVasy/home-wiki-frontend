import axiosClient from './axiosClient';
import { Article, PagedList } from '../types/interfaces';

export const ArticleService = {
  async getArticles(pageNumber = 1, pageSize = 10): Promise<PagedList<Article>> {
    const response = await axiosClient.get<PagedList<Article>>('/Article/paged', {
      params: { pageNumber, pageSize },
    });
    return response.data;
  },

  async searchArticles(name: string, pageNumber = 1, pageSize = 10): Promise<PagedList<Article>> {
    const response = await axiosClient.get<PagedList<Article>>('/Article/search', {
      params: { name, pageNumber, pageSize },
    });
    return response.data;
  },

  async getById(id: number): Promise<Article> {
    const response = await axiosClient.get<Article>(`/Article/${id}`);
    return response.data;
  },

  async create(article: Partial<Article>): Promise<Article> {
    const response = await axiosClient.post<Article>('/Article', article);
    return response.data;
  },

  async update(article: Partial<Article>): Promise<Article> {
    const response = await axiosClient.put<Article>('/Article', article);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    console.log(`Deleting article with ID: ${id}`);
    await axiosClient.delete(`/Article/${id}`);
  },
};
