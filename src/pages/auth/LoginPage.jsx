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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login({ email: formData.email, password: formData.password });
    
    if (response && response.verificationUuid) {
      // Navigate to OTP page for verification
      navigate('/otp', { 
        state: { 
          verification_uuid: response.verificationUuid, 
          action: 'login',
          email: formData.email,
        } 
      });
    } else if (response && response.result && response.result.token) {
      // Login successful without OTP, navigate to dashboard
      navigate('/dashboard');
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
      </div>
    </div>
  );
};

export default LoginPage; 