import React, { useState } from 'react';
import { useAuth } from '../store/authStore';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { resetPassword } from '../services/authService';

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
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'password', label: 'Password', icon: '🔑' },
    { id: 'support', label: 'Support', icon: '📧' },
    { id: 'language', label: 'Language', icon: '🌍' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 
          className="text-3xl font-bold mb-2"
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

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 shadow-sm'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            style={{
              color: activeTab === tab.id ? colors.textColor : colors.secondaryTextColor,
            }}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="text-green-600 text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          {success}
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
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
            <div className="grid grid-cols-2 gap-4">
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
            <Button type="submit" variant="primary" disabled={loading}>
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
            <Button type="submit" variant="primary" disabled={loading}>
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
            <Button type="submit" variant="primary">
              Send Support Request
            </Button>
          </form>
        )}

        {activeTab === 'language' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.textColor }}>
              Language Settings
            </h3>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input type="radio" name="language" value="en" defaultChecked />
                <span style={{ color: colors.textColor }}>English</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="language" value="es" />
                <span style={{ color: colors.textColor }}>Español</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="language" value="fr" />
                <span style={{ color: colors.textColor }}>Français</span>
              </label>
            </div>
            <Button variant="primary">
              Save Language Preference
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SettingsPage; 