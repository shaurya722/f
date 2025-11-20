import axios from 'axios';
import { tokenStore } from '@/utils/tokenStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = tokenStore.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      tokenStore.delete();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
