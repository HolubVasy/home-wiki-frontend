import { useState } from 'react';

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

// Mock auth hook - authentication is disabled
export const useAuth = () => {
  // Always return a mock authenticated user
  const mockUser = {
    id: '1',
    email: 'user@example.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/avatar.jpg'
  };

  return {
    user: mockUser,
    loading: false,
    error: null,
    isAuthenticated: true,
    // Mock functions that do nothing but accept parameters
    login: async (email: string, password: string) => {},
    register: async (email: string, password: string, displayName: string) => {},
    logout: async () => {},
    updateUserProfile: async (displayName: string, photoURL?: string) => {}
  };
};
