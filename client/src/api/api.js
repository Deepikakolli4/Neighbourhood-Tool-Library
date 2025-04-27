import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

console.log(`Client is connecting to Server at ${process.env.REACT_APP_API_URL}`);

// Add request interceptor to include JWT token in Authorization header
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
