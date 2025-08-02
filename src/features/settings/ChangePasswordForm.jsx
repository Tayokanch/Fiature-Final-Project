import React, { useState } from 'react';
import { useAuth } from '../../store/authStore';
import { changePassword } from '../../services/authService';
import Input from '../../components/Input';
import Button from '../../components/Button';

const ChangePasswordForm = () => {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await changePassword({
        email: '', // Optionally fetch from user context
        newPassword,
        recaptchaToken: 'forgot_password',
      }, token);
      setSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Change Password</h2>
      <Input
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
        required
      />
      <Input
        label="New Password"
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
        required
      />
      <Input
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}
      <Button type="submit" variant="primary" disabled={loading} className="w-full">
        {loading ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  );
};

export default ChangePasswordForm; 