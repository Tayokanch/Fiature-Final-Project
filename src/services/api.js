// 🔐 PROTECTED API INSTANCE - Automatically adds Bearer token to ALL requests
// Used for: Dashboard, Transactions, User data, etc.
import axios from 'axios';
import { isTokenExpired } from '../utils/jwtUtils';

// Function to update auth store token (will be set by the app)
let updateAuthToken = null;
export const setUpdateAuthToken = (fn) => {
  updateAuthToken = fn;
};

const API_BASE_URL = 'https://890fd417a30b.ngrok-free.app';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOnsidmFsaWQiOnRydWUsInVzZXJJZCI6ImI1NjgzMmNlLWI3MGQtNDAyZS04ODRiLTlmYzVmYjk3MjFiMSJ9LCJpYXQiOjE3NTQxNTY2ODEsImV4cCI6MTc1NDE1NzU4MX0.czt1yr1DBcaOWiP1hkdzVR9GsjgaPXXR01fc9f1mgaA';

const protectedApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});
// 🔐 REQUEST INTERCEPTOR - Automatically adds Bearer token to every request
/* protectedApi.interceptors.request.use(
  async (config) => {
    // For development: use hardcoded token, fallback to localStorage
    const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOnsidmFsaWQiOnRydWUsInVzZXJJZCI6ImI1NjgzMmNlLWI3MGQtNDAyZS04ODRiLTlmYzVmYjk3MjFiMSJ9LCJpYXQiOjE3NTQxNDEyMzMsImV4cCI6MTc1NDE0MjEzM30.ciOxIBEJMlCmyHhE88Q9vtMEya79d7aE-cfDxbS37wQ";
    const token = hardcodedToken || localStorage.getItem('authToken');
    if (token) {
      // Check if token is expired before making request
      if (isTokenExpired(token)) {
        // Token is expired, but keep it for the refresh request
        
        // Attempt to refresh the token
        const hardcodedRefreshToken = "7ce1655753bcc8c43aa57e06085f30f2c37f757d39028a8729c367aedf0cf4516a9951c555fc2b211ec9da350ba379beb971008822bb9d417a81759eef743fce";
        const refreshToken = hardcodedRefreshToken || localStorage.getItem('refreshToken');
        if (!refreshToken) {
          window.location.href = '/login';
          return Promise.reject(new Error('No refresh token available'));
        }

        try {
          const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
            refreshToken
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          const { accessToken: newToken } = response.data;
          if (!newToken) {
            throw new Error('No new token received');
          }

          localStorage.removeItem('authToken');
          localStorage.setItem('authToken', newToken);
          
          if (updateAuthToken) {
            updateAuthToken(newToken);
          }
          
          config.headers.Authorization = `Bearer ${newToken}`;
          return config;
          
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(new Error('Token refresh failed'));
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 */

/* protectedApi.interceptors.request.use(async (config) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOnsidmFsaWQiOnRydWUsInVzZXJJZCI6ImI1NjgzMmNlLWI3MGQtNDAyZS04ODRiLTlmYzVmYjk3MjFiMSJ9LCJpYXQiOjE3NTQxNDIxMjQsImV4cCI6MTc1NDE0MzAyNH0.zNzxz-xp4nqEvpHJqzVOaYYU1yKZtRPFxV20L6TY8g0';
  config.headers.Authorization = `Bearer ${token}`;
  return config;
}); */

export default protectedApi;
