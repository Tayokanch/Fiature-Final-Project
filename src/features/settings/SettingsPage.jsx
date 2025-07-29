import React from 'react';
import Card from '../../components/Card';
import ChangePasswordForm from './ChangePasswordForm';
import ContactSupport from './ContactSupport';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <Card>
        <ChangePasswordForm />
      </Card>
      <Card>
        <ContactSupport />
      </Card>
      {/* Optional: Language Switcher, Profile Update */}
    </div>
  );
};

export default SettingsPage; 