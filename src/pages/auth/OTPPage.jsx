import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { verifyOtp } from '../../services/authService';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../store/themeStore';
import { getThemeColors } from '../../utils/themeUtils';

const OTPPage = () => {
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const { verification_uuid, action, email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const otpData = {
        verification_uuid,
        otpCode,
        action,
        deviceInfo: {
          deviceId: 'web',
          platform: 'web'
        }
      };

      const response = await verifyOtp(otpData);
      if (response.token) {
        authLogin(response.user, response.token, response.refreshToken);
        navigate('/dashboard');
      } else {
        setError(response.message || 'OTP verification failed');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (!verification_uuid) {
    return (
      <div className="text-center">
        <div 
          className="text-red-500 mb-4"
          style={{ color: colors.textColor }}
        >
          Invalid OTP session. Please login or signup again.
        </div>
        <Button onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 
          className="text-2xl font-bold mb-2"
          style={{ color: colors.textColor }}
        >
          Verify Your Email
        </h1>
        <p 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          Enter the 6-digit code sent to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="OTP Code"
          value={otpCode}
          onChange={(e) => setOtpCode(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
          required
          validate={(value) => {
            if (!value) return 'OTP code is required';
            if (value.length !== 6) return 'OTP code must be 6 digits';
            return '';
          }}
        />

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </Button>
      </form>

      <div className="text-center">
        <p 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          Didn't receive the code?{' '}
          <button 
            className="font-medium hover:underline"
            style={{ color: colors.iconColor }}
            onClick={() => navigate('/login')}
          >
            Try again
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPPage; 