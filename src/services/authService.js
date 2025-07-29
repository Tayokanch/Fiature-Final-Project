import api from './api';

export const login = async (credentials) => {
  try {
    console.log('authService: Making login request with:', credentials);
    const response = await api.post('/login', credentials);
    console.log('authService: Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('authService: Login error:', error);
    // Return the error response data instead of throwing
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: 'Login failed' };
  }
};

export const signup = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post('/verify-otp', otpData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'OTP verification failed');
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/forget-password', {
      email,
      recaptchaToken: 'forgot_password',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await api.post('/reset-password', {
      ...resetData,
      recaptchaToken: 'forgot_password',
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password reset failed');
  }
};

export const changePassword = async (passwordData, token) => {
  try {
    const response = await api.post('/change-password', passwordData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Password change failed');
  }
};

export const refreshToken = async (refreshTokenData) => {
  try {
    const response = await api.post('/refresh-token', refreshTokenData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
}; 