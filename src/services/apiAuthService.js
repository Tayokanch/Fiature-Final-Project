import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);

    return response.data;
  } catch (error) {
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
    console.log('authService: Sending OTP verification request:', otpData);
    const response = await api.post('/verify-code', otpData);
    if (response.data && response.data.result && response.data.result.token) {
      const { token, refreshToken } = response.data.result;
      console.log('authService: Saving tokens to localStorage');
      if (token) {
        localStorage.setItem('authToken', token);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }

    return response.data;
  } catch (error) {
    console.error('authService: OTP verification error:', error);
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return { message: 'OTP verification failed' };
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
