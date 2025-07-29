import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Button from './Button';
import { FiSun, FiMoon, FiLogOut, FiSettings, FiGrid } from 'react-icons/fi';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const colors = getThemeColors(isDarkMode);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav 
      className="w-full flex items-center justify-between px-6 py-4 shadow-lg"
      style={{ backgroundColor: colors.cardBg }}
    >
      <div className="flex items-center gap-2">
        <FiGrid 
          size={24} 
          style={{ color: colors.iconColor }}
        />
        <span 
          className="text-xl font-bold"
          style={{ color: colors.headerText }}
        >
          Fiature Dev Portal
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <Link 
          to="/dashboard" 
          className="font-medium hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
          style={{ color: colors.headerText }}
        >
          <FiGrid size={16} />
          Dashboard
        </Link>
        <Link 
          to="/settings" 
          className="font-medium hover:opacity-80 transition-opacity flex items-center gap-2 cursor-pointer"
          style={{ color: colors.headerText }}
        >
          <FiSettings size={16} />
          Settings
        </Link>
        
        <Button
          variant="secondary"
          onClick={toggleDarkMode}
          className="ml-4 p-2"
        >
          {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
        </Button>
        
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <FiLogOut size={16} />
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default Navbar; 