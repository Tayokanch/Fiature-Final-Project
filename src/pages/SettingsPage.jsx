import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { resetPassword } from '../services/authService';
import { FiUser, FiLock, FiMail, FiGlobe, FiCheck, FiX } from 'react-icons/fi';

const SettingsPage = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Support form state
  const [supportData, setSupportData] = useState({
    subject: '',
    message: '',
  });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Implement profile update API call
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await resetPassword({
        email: user?.email,
        newPassword: passwordData.newPassword,
      });
      setSuccess('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:support@fiature.com?subject=${encodeURIComponent(supportData.subject)}&body=${encodeURIComponent(supportData.message)}`;
    window.location.href = mailtoLink;
    setSuccess('Support request sent!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FiUser size={16} /> },
    { id: 'password', label: 'Password', icon: <FiLock size={16} /> },
    { id: 'support', label: 'Support', icon: <FiMail size={16} /> },
    { id: 'language', label: 'Language', icon: <FiGlobe size={16} /> },
  ];

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{ color: colors.textColor }}
        >
          Settings
        </h1>
        <p 
          className="text-sm"
          style={{ color: colors.secondaryTextColor }}
        >
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tab Navigation - Responsive */}
      <div 
        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 p-1 rounded-lg overflow-hidden"
        style={{ backgroundColor: colors.cardBg }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center sm:justify-start py-3 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'shadow-sm transform scale-[1.02]'
                : 'hover:opacity-80'
            }`}
            style={{
              color: activeTab === tab.id ? colors.textColor : colors.secondaryTextColor,
              backgroundColor: activeTab === tab.id ? colors.brandButtonBg : 'transparent',
            }}
          >
            <span className="mr-2" style={{ color: activeTab === tab.id ? colors.brandButtonText : colors.iconColor }}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div 
          className="flex items-center gap-2 text-green-600 text-center p-4 rounded-lg"
          style={{ backgroundColor: `${colors.cardBg}80` }}
        >
          <FiCheck size={16} />
          {success}
        </div>
      )}
      {error && (
        <div 
          className="flex items-center gap-2 text-red-500 text-center p-4 rounded-lg"
          style={{ backgroundColor: `${colors.cardBg}80` }}
        >
          <FiX size={16} />
          {error}
        </div>
      )}

      {/* Tab Content */}
      <Card>
        {activeTab === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textColor }}>
              Profile Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              />
              <Input
                label="Last Name"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
            <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Updating...' : 'Update Profile'}
            </Button>
          </form>
        )}

        {activeTab === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textColor }}>
              Change Password
            </h3>
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              required
            />
            <Button type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </form>
        )}

        {activeTab === 'support' && (
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textColor }}>
              Contact Support
            </h3>
            <Input
              label="Subject"
              value={supportData.subject}
              onChange={(e) => setSupportData({ ...supportData, subject: e.target.value })}
              required
            />
            <Input
              label="Message"
              value={supportData.message}
              onChange={(e) => setSupportData({ ...supportData, message: e.target.value })}
              required
            />
            <Button type="submit" variant="primary" className="w-full sm:w-auto">
              Send Support Request
            </Button>
          </form>
        )}

        {activeTab === 'language' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textColor }}>
              Language Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-opacity-50 transition-colors"
                style={{ 
                  borderColor: colors.borderColor,
                  backgroundColor: colors.cardBg 
                }}>
                <input 
                  type="radio" 
                  name="language" 
                  value="en" 
                  defaultChecked 
                  className="text-blue-600"
                />
                <span style={{ color: colors.textColor }}>English</span>
              </label>
              <label className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-opacity-50 transition-colors"
                style={{ 
                  borderColor: colors.borderColor,
                  backgroundColor: colors.cardBg 
                }}>
                <input 
                  type="radio" 
                  name="language" 
                  value="es" 
                  className="text-blue-600"
                />
                <span style={{ color: colors.textColor }}>Español</span>
              </label>
              <label className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-opacity-50 transition-colors"
                style={{ 
                  borderColor: colors.borderColor,
                  backgroundColor: colors.cardBg 
                }}>
                <input 
                  type="radio" 
                  name="language" 
                  value="fr" 
                  className="text-blue-600"
                />
                <span style={{ color: colors.textColor }}>Français</span>
              </label>
            </div>
            <Button variant="primary" className="w-full sm:w-auto">
              Save Language Preference
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SettingsPage; 