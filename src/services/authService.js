import protectedApi from './api';
import axios from 'axios';


const publicApi = axios.create({
  baseURL: 'https://890fd417a30b.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const login = async (credentials) => {
  try {
    const response = await publicApi.post('/login', credentials);
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || 'Login failed' };
  }
};

// 🔓 VERIFY OTP - Uses public API (no token needed)
export const verifyOtp = async (otpData) => {
  try {
    const response = await publicApi.post('/verify-code', otpData);
    
    // Save tokens to localStorage if verification is successful
    if (response.data && response.data.result && response.data.result.token) {
      const { token, refreshToken } = response.data.result;
      token? localStorage.setItem('authToken', token) : localStorage.removeItem('authToken');
      refreshToken ? localStorage.setItem('refreshToken', refreshToken) : localStorage.removeItem('refreshToken');
    }
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || 'OTP verification failed' };
  }
};

// 🔓 SIGNUP - Uses public API (no token needed)
export const signup = async (userData) => {
  try {
    const response = await publicApi.post('/signup', userData);
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || 'Signup failed' };
  }
};

// 🔐 REFRESH TOKEN - Uses protected API (token needed)
export const refreshToken = async (refreshTokenData) => {
  try {
    const response = await protectedApi.post('/refresh-token', refreshTokenData);
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || 'Token refresh failed' };
  }
};

// 🔓 PASSWORD RESET - Uses public API (no token needed)
export const forgotPassword = async (email) => {
  try {
    const response = await publicApi.post('/forget-password', {
      email,
      recaptchaToken: 'forgot_password',
    });
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || 'Password reset failed' };
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await publicApi.post('/reset-password', {
      ...resetData,
      recaptchaToken: 'forgot_password',
    });
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || 'Password reset failed' };
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await publicApi.post('/change-password', passwordData);
    return response.data;
  } catch (error) {
    return { message: error.response?.data?.message || 'Password change failed' };
  }
}; 