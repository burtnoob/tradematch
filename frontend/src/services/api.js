// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request config:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

const api = {
  login: async (credentials) => {
    console.log('Login attempt with:', credentials);
    const response = await axiosInstance.post('/auth/login', credentials);
    console.log('Login response:', response.data);
    return response.data;
  },

  getTrades: async () => {
    console.log('Fetching trades...');
    const response = await axiosInstance.get('/trades');
    console.log('Trades response:', response.data);
    return response.data;
  }
};

export default api;