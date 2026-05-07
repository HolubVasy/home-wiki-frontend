// src/api/axiosClient.ts
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'https://homewiki.azurewebsites.net';

const axiosClient = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
