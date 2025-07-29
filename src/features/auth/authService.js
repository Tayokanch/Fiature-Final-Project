import api from '../../services/api';

export const login = async (credentials) => {
  try {
    const { data } = await api.post('/login', credentials);
    return data;
  } catch (err) {
    return { message: err?.response?.data?.message || 'Login failed' };
  }
};

export const signup = async (data) => {
  try {
    const res = await api.post('/signup', data);
    return res.data;
  } catch (err) {
    return { message: err?.response?.data?.message || 'Signup failed' };
  }
};

export const verifyOtp = async (data) => {
  try {
    const res = await api.post('/verify-otp', data);
    return res.data;
  } catch (err) {
    return { message: err?.response?.data?.message || 'OTP verification failed' };
  }
};

export const refreshToken = async ({ refreshToken }) => {
  try {
    const res = await api.post('/refresh-token', { refreshToken });
    return res.data;
  } catch (err) {
    return { message: err?.response?.data?.message || 'Token refresh failed' };
  }
}; 