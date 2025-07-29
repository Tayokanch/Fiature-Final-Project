import React from 'react';
import { Outlet } from 'react-router-dom';
import Card from '../components/Card';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Button from '../components/Button';
import { FiSun, FiMoon } from 'react-icons/fi';

const AuthLayout = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{ backgroundColor: colors.bg }}
    >
      {/* Theme Toggle Button - Top Right */}
      <div className="absolute top-4 right-4">
        <Button
          variant="secondary"
          onClick={toggleDarkMode}
          className="p-2 rounded-full"
        >
          {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
        </Button>
      </div>
      
      <Card className="w-full max-w-md">
        <Outlet />
      </Card>
    </div>
  );
};

export default AuthLayout; 