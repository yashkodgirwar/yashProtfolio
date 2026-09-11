import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const portfolioAPI = {
  getPortfolio: () => api.get('/portfolio'),
  updateProfile: (profileData) => api.put('/portfolio/profile', profileData),
  addItem: (section, itemData) => api.post(`/portfolio/${section}`, itemData),
  updateItem: (section, id, itemData) => api.put(`/portfolio/${section}/${id}`, itemData),
  deleteItem: (section, id) => api.delete(`/portfolio/${section}/${id}`),
  resetPortfolio: () => api.post('/portfolio/reset'),
  uploadFile: (formData) => api.post('/portfolio/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

export const contactAPI = {
  sendMessage: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact'),
};

export default api;
