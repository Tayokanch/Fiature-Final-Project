import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useTheme } from '../../store/themeStore';
import { getThemeColors } from '../../utils/themeUtils';
import { encryptRecaptchaToken } from '../../features/auth/authUtils';
import { FiMail, FiLock, FiUser, FiUserPlus } from 'react-icons/fi';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
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
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const signupData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        recaptchaToken: encryptRecaptchaToken(formData.email), // Encrypted email
      };

      const response = await signup(signupData);
      if (response.verificationUuid) {
        navigate('/otp', { 
          state: { 
            verification_uuid: response.verificationUuid, 
            action: 'signup', 
            email: formData.email 
          } 
        });
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 
          className="text-2xl font-bold mb-2 flex items-center justify-center gap-2"
          style={{ color: colors.textColor }}
        >
          <FiUserPlus size={24} style={{ color: colors.iconColor }} />
          Create Account
        </h1>
        <p 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          Join the Fiature developer community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            icon={FiUser}
            required
            validate={(value) => {
              if (!value) return 'First name is required';
              return '';
            }}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            icon={FiUser}
            required
            validate={(value) => {
              if (!value) return 'Last name is required';
              return '';
            }}
          />
        </div>

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

        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          icon={FiLock}
          required
          validate={(value) => {
            if (!value) return 'Please confirm your password';
            if (value !== formData.password) return 'Passwords do not match';
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
          <FiUserPlus size={16} />
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>

      <div className="text-center">
        <p 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          Already have an account?{' '}
          <Link 
            to="/login"
            className="font-medium hover:underline"
            style={{ color: colors.iconColor }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage; 