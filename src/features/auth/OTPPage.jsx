import React, { useState } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPPage = () => {
  const [otpCode, setOtpCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, loading: authLoading, error: authError } = useAuth();

  const { verification_uuid: verificationUuid, action, email } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const deviceInfo = { deviceId: 'web', platform: 'web' };
    const response = await verifyOtp({ verification_uuid: verificationUuid, otpCode, action, deviceInfo });
    if (response && response.token) {
      navigate('/dashboard');
    }
  };

  if (!verificationUuid) {
    return <div className="text-red-500">Invalid OTP session. Please login or signup again.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
      <Input
        label="OTP Code"
        value={otpCode}
        onChange={e => setOtpCode(e.target.value)}
        required
      />
      {authError && <div className="text-red-500 text-sm">{authError}</div>}
      <Button type="submit" variant="primary" disabled={authLoading} className="w-full">
        {authLoading ? 'Verifying...' : 'Verify OTP'}
      </Button>
    </form>
  );
};

export default OTPPage; 