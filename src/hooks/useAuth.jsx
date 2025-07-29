import { useState } from 'react';
import { useAuth as useAuthContext } from '../store/authStore';
import {
  login as loginApi,
  signup as signupApi,
  verifyOtp as verifyOtpApi,
  refreshToken as refreshTokenApi,
} from '../features/auth/authService';
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
      const response = await loginApi({ email, password, recaptchaToken });
      
      // If we have a verificationUuid, OTP verification is required
      if (response && response.verificationUuid) {
        return response;
      }
      
      // Check for token in nested result object (OTP verification response)
      if (response && response.result && response.result.token) {
        const { token, refreshToken, user } = response.result;
        // Update React state (tokens already saved to localStorage by service)
        authContext.setToken(token);
        if (refreshToken) authContext.setRefreshToken(refreshToken);
        if (user) authContext.setUser(user);
        return response;
      }
      
      // Check for direct token (direct login response)
      if (response && response.token) {
        // Update React state (tokens already saved to localStorage by service)
        authContext.setToken(response.token);
        if (response.refreshToken) authContext.setRefreshToken(response.refreshToken);
        return response;
      }
      
      // If we get here, something went wrong
      setAuthError(response?.message || 'Login failed');
      return response;
      
    } catch (error) {
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
      if (!response?.verificationUuid) setAuthError(response?.message || 'Signup failed');
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
      console.log('useAuth verifyOtp response:', response);
      
      // Check if response has result object with token
      if (response && response.result && response.result.token) {
        console.log('OTP verification successful, updating auth state');
        const { token, refreshToken, user } = response.result;
        
        // Update React state (tokens already saved to localStorage by service)
        authContext.setToken(token);
        if (refreshToken) authContext.setRefreshToken(refreshToken);
        if (user) authContext.setUser(user);
        
        return response;
      } else {
        // Return the response for component to handle
        return response;
      }
    } catch (error) {
      console.error('useAuth verifyOtp error:', error);
      return { message: 'OTP verification failed' };
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