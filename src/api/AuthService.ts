// src/api/AuthService.ts
import axiosClient from './axiosClient';
import { User } from '../types/interfaces';

const AuthService = {
  async login(email: string, password: string): Promise<User> {
    const response = await axiosClient.post<User>('/auth/login', { email, password });
    return response.data;
  },

  async register(email: string, password: string): Promise<User> {
    const response = await axiosClient.post<User>('/auth/register', { email, password });
    return response.data;
  },

  async logout(): Promise<void> {
    await axiosClient.post('/auth/logout');
  },
};

export default AuthService;
