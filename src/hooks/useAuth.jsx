import { useState } from 'react';
import { useAuth as useAuthContext } from '../store/authStore';
import {
  login as loginApi,
  signup as signupApi,
  verifyOtp as verifyOtpApi,
  refreshToken as refreshTokenApi,
} from '../features/auth/authService';
import { saveToken } from '../utils/authUtils';
import { encryptRecaptchaToken } from '../features/auth/authUtils';

export const useAuth = () => {
  const authContext = useAuthContext();
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const login = async ({ email, password }) => {
    setAuthError('');
    setAuthLoading(true);
    try {
      const recaptchaToken = encryptRecaptchaToken(email);
      console.log('useAuth login called with:', { email, recaptchaToken });
      const response = await loginApi({ email, password, recaptchaToken });
      console.log('useAuth login response:', response);
      
      if (response && response.token) {
        saveToken(response.token);
        authContext.setToken(response.token);
        if (response.refreshToken) authContext.setRefreshToken(response.refreshToken);
        return response;
      } else if (response && response.verification_uuid) {
        // OTP verification required
        console.log('OTP verification required, returning response:', response);
        return response;
      } else {
        setAuthError(response?.message || 'Login failed');
        return response;
      }
    } catch (error) {
      console.error('useAuth login error:', error);
      setAuthError('Login failed');
      return { message: 'Login failed' };
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