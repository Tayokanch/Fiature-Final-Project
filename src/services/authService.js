import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
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

export const refreshToken = async (refreshTokenData) => {
  try {
    const response = await api.post('/refresh-token', refreshTokenData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Token refresh failed');
  }
}; 