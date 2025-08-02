import { useState } from 'react';
import { useAuth as useAuthContext } from '../store/authStore';
import {
  login as loginApi,
  signup as signupApi,
  verifyOtp as verifyOtpApi,
} from '../services/authService';
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
      
      // If login is successful without OTP, update auth state
      if (response && response.result && response.result.token) {
        const { token, user } = response.result;
        authContext.login(user, token);
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
      
      // If OTP verification is successful, update auth state
      if (response && response.result && response.result.token) {
        const { token, user } = response.result;
        authContext.login(user, token);
        return response;
      } else {
        // Return the response for component to handle
        return response;
      }
    } catch (error) {
      setAuthError('OTP verification failed');
      return { message: 'OTP verification failed' };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    authContext.logout();
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
  };
}; 