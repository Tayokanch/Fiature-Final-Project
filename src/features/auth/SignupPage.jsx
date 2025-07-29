import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup, loading: authLoading, error: authError } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await signup({ email, password, firstName, lastName });
    if (response && response.verification_uuid) {
      navigate('/otp', { state: { verification_uuid: response.verification_uuid, action: 'signup', email } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <Input
        label="First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
      />
      <Input
        label="Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
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
        {authLoading ? 'Signing up...' : 'Sign Up'}
      </Button>
      <div className="text-sm mt-2">
        Already have an account? <a href="/login" className="text-blue-500">Login</a>
      </div>
    </form>
  );
};

export default SignupPage; 