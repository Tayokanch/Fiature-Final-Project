import api from '../../services/api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response.data;
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
    console.log('authService: Sending OTP verification request:', data);
    const response = await api.post('/verify-code', data);
    console.log('authService: OTP verification success response:', response.data);
    if (response.data && response.data.result && response.data.result.token) {
      const { token, refreshToken } = response.data.result;
      localStorage.setItem('authToken', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      console.log('authService: Tokens saved successfully');
    } else {
      console.log('authService: No tokens found in response:', response.data);
    }
    
    return response.data;
  } catch (err) {
    console.error('authService: OTP verification error:', err);
    if (err.response && err.response.data) {
      return err.response.data;
    }
    return { message: 'OTP verification failed' };
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