import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import {
  login as loginApi,
  signup as signupApi,
  verifyOtp as verifyOtpApi,
  refreshToken as refreshTokenApi,
} from '../features/auth/authService';
import { saveToken, encryptRecaptchaToken } from '../features/auth/authUtils';

export const useAuth = () => {
  const authContext = useAuthStore();
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const login = async ({ email, password }) => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const recaptchaToken = encryptRecaptchaToken(email);
      const response = await loginApi({ email, password, recaptchaToken });
      if (response && response.token) {
        saveToken(response.token);
        authContext.setToken(response.token);
        if (response.refreshToken) authContext.setRefreshToken(response.refreshToken);
        return response;
      } else {
        setAuthError(response?.message || 'Login failed');
      }
    } catch (error) {
      setAuthError('Login failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async ({ email, password, firstName, lastName }) => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const recaptchaToken = encryptRecaptchaToken(email);
      const response = await signupApi({ email, password, recaptchaToken, firstName, lastName });
      if (!response?.verification_uuid) setAuthError(response?.message || 'Signup failed');
      return response;
    } catch (error) {
      setAuthError('Signup failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const verifyOtp = async (payload) => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const response = await verifyOtpApi(payload);
      if (response && response.token) {
        saveToken(response.token);
        authContext.setToken(response.token);
        if (response.refreshToken) authContext.setRefreshToken(response.refreshToken);
        return response;
      } else {
        setAuthError(response?.message || 'OTP verification failed');
      }
    } catch (error) {
      setAuthError('OTP verification failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    authContext.logout();
  };

  const refresh = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      await authContext.handleRefreshToken();
    } catch {
      setAuthError('Token refresh failed');
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user: authContext.user,
    token: authContext.token,
    loading: authContext.loading || authLoading,
    error: authError,
    login,
    signup,
    verifyOtp,
    logout,
    refresh,
  };
}; 