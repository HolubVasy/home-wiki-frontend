import { Category } from '../types/interfaces';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const categoryService = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return response.json();
  },

  // Search categories by keyword
  async searchCategories(keyword: string): Promise<Category[]> {
    const response = await fetch(
      `${API_BASE_URL}/categories/search?keyword=${encodeURIComponent(keyword)}`
    );
    if (!response.ok) {
      throw new Error('Failed to search categories');
    }
    return response.json();
  },

  // Create new category
  async createCategory(name: string, description?: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    if (!response.ok) {
      throw new Error('Failed to create category');
    }
    return response.json();
  },

  // Update category
  async updateCategory(id: number, name: string, description?: string): Promise<Category> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    if (!response.ok) {
      throw new Error('Failed to update category');
    }
    return response.json();
  },

  // Delete category
  async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  },

  // Check if category can be deleted (no articles using it)
  async canDeleteCategory(id: number): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}/can-delete`);
    if (!response.ok) {
      throw new Error('Failed to check category deletion possibility');
    }
    const { canDelete } = await response.json();
    return canDelete;
  },

  // Get articles by category
  async getArticlesByCategory(categoryId: string, page: number = 1, pageSize: number = 10) {
    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/articles?page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch articles by category');
    }
    return response.json();
  },
};
