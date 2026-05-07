import { Tag } from '../types/interfaces';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const tagService = {
  // Get all tags
  async getTags(): Promise<Tag[]> {
    const response = await fetch(`${API_BASE_URL}/tags`);
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    return response.json();
  },

  // Search tags by keyword
  async searchTags(keyword: string): Promise<Tag[]> {
    const response = await fetch(
      `${API_BASE_URL}/tags/search?keyword=${encodeURIComponent(keyword)}`
    );
    if (!response.ok) {
      throw new Error('Failed to search tags');
    }
    return response.json();
  },

  // Create new tag
  async createTag(name: string): Promise<Tag> {
    const response = await fetch(`${API_BASE_URL}/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Failed to create tag');
    }
    return response.json();
  },

  // Update tag
  async updateTag(id: string, name: string): Promise<Tag> {
    const response = await fetch(`${API_BASE_URL}/tags/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error('Failed to update tag');
    }
    return response.json();
  },

  // Delete tag
  async deleteTag(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tags/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete tag');
    }
  },

  // Check if tag can be deleted (no articles using it)
  async canDeleteTag(id: string): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/tags/${id}/can-delete`);
    if (!response.ok) {
      throw new Error('Failed to check tag deletion possibility');
    }
    const { canDelete } = await response.json();
    return canDelete;
  },
};
