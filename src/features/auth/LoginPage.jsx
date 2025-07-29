import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { login, loading: authLoading, error: authError } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login({ email, password, name });
    
    if (response && response.verification_uuid) {
      // Navigate to OTP page for verification
      navigate('/otp', { 
        state: { 
          verification_uuid: response.verification_uuid, 
          action: 'login', 
          email: email
        } 
      });
    } else if (response && response.token) {
      // Direct login success (no OTP required)
      navigate('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Input
        label="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {authError && <div className="text-red-500 text-sm">{authError}</div>}
      <Button type="submit" variant="primary" disabled={authLoading} className="w-full">
        {authLoading ? 'Logging in...' : 'Login'}
      </Button>
      <div className="text-sm mt-2">
        Don&apos;t have an account? <a href="/signup" className="text-blue-500">Sign up</a>
      </div>
    </form>
  );
};

export default LoginPage; 