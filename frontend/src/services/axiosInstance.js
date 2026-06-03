import axios from 'axios';
import { config } from '@/config/env';

// Development:  baseURL = '' → requests go to localhost:5173/api/*
//               Vite proxy forwards them to localhost:8000/api/* (no CORS required)
//
// Production:   baseURL = VITE_API_BASE_URL (e.g. https://api.accetraa.com)
//               requests go directly to the production API host
const baseURL = import.meta.env.DEV ? '' : config.apiBaseUrl;

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // No response → backend is unreachable (not running, wrong port, network issue)
    if (!error.response) {
      return Promise.reject(
        new Error('Cannot reach the server. Is the Django backend running on port 8000?')
      );
    }

    const message =
      error.response.data?.message  ||
      error.response.data?.detail   ||
      error.response.data?.error    ||
      error.message                 ||
      'An unexpected error occurred.';

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
