// Axios instance for API calls with auth and refresh logic
import axios from 'axios';

const API_BASE_URL = 'https://890fd417a30b.ngrok-free.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
            refreshToken,
          });

          // Handle both direct token response and nested result response
          let newToken, newRefreshToken;
          
          if (response.data.result && response.data.result.token) {
            // Nested result structure
            newToken = response.data.result.token;
            newRefreshToken = response.data.result.refreshToken;
          } else if (response.data.token) {
            // Direct token structure
            newToken = response.data.token;
            newRefreshToken = response.data.refreshToken;
          }

          if (newToken) {
            localStorage.setItem('authToken', newToken);
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            }
            
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api; 