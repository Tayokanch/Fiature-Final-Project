import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../store/themeStore';
import { getThemeColors } from '../../utils/themeUtils';
import { FiMail, FiLock, FiUser, FiLogIn } from 'react-icons/fi';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('LoginPage: Calling login with:', { email: formData.email, password: formData.password });
      const response = await login({ email: formData.email, password: formData.password });
      console.log('LoginPage: Received response:', response);
      
      if (response && response.verification_uuid) {
        console.log('LoginPage: Navigating to OTP page with verification_uuid:', response.verification_uuid);
        // Navigate to OTP page for verification
        navigate('/otp', { 
          state: { 
            verification_uuid: response.verification_uuid, 
            action: 'login', 
            email: formData.email 
          } 
        });
      } else if (response && response.token) {
        console.log('LoginPage: Direct login success, navigating to dashboard');
        // Direct login success (no OTP required)
        navigate('/dashboard');
      } else {
        console.log('LoginPage: No verification_uuid or token in response');
      }
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('LoginPage: Login error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
          style={{ color: colors.textColor }}
        >
          <FiLogIn size={24} style={{ color: colors.iconColor }} />
          Welcome Back
        </h1>
        <p 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          Sign in to your developer account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={FiMail}
          required
          validate={(value) => {
            if (!value) return 'Email is required';
            if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
            return '';
          }}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          icon={FiLock}
          required
          validate={(value) => {
            if (!value) return 'Password is required';
            if (value.length < 6) return 'Password must be at least 6 characters';
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
          className="w-full flex items-center justify-center gap-2"
        >
          <FiLogIn size={16} />
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center">
        <p 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          Don't have an account?{' '}
          <Link 
            to="/signup"
            className="font-medium hover:underline"
            style={{ color: colors.iconColor }}
          >
            Sign up
          </Link>
        </p>
        
        {/* Test button for debugging */}
        <button 
          onClick={() => {
            console.log('Test navigation to OTP');
            navigate('/otp', { 
              state: { 
                verification_uuid: 'test-uuid', 
                action: 'login', 
                email: 'test@example.com' 
              } 
            });
          }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Test OTP Navigation
        </button>
      </div>
    </div>
  );
};

export default LoginPage; 