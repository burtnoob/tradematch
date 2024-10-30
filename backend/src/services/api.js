// File path: frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Trade API calls
export const tradeAPI = {
    // Get all trades
    getAllTrades: () => api.get('/trades'),
    
    // Get single trade
    getTrade: (id) => api.get(`/trades/${id}`),
    
    // Create trade
    createTrade: (data) => api.post('/trades', data),
    
    // Update trade
    updateTrade: (id, data) => api.put(`/trades/${id}`, data),
    
    // Confirm trade
    confirmTrade: (id) => api.post(`/trades/${id}/confirm`),
    
    // Dispute trade
    disputeTrade: (id, reason) => api.post(`/trades/${id}/dispute`, { reason }),
    
    // Upload trade data
    uploadTradeData: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/trades/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};

// Auth API calls
export const authAPI = {
    // Login
    login: (credentials) => api.post('/auth/login', credentials),
    
    // Register
    register: (userData) => api.post('/auth/register', userData),
    
    // Get current user
    getCurrentUser: () => api.get('/auth/me'),
    
    // Change password
    changePassword: (passwords) => api.post('/auth/change-password', passwords),
    
    // Reset password request
    resetPasswordRequest: (email) => api.post('/auth/reset-password-request', { email }),
    
    // Reset password
    resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password })
};

export default {
    tradeAPI,
    authAPI
};
