import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';
import Button from './Button';
import { FiSun, FiMoon, FiLogOut, FiSettings, FiGrid, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const colors = getThemeColors(isDarkMode);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 shadow-lg relative"
      style={{ backgroundColor: colors.cardBg }}
    >
      {/* Logo and Brand */}
      <div className="flex items-center gap-2">
        <FiGrid 
          size={24} 
          style={{ color: colors.iconColor }}
        />
        <span 
          className="text-lg sm:text-xl font-bold"
          style={{ color: colors.headerText }}
        >
          Fiature Dev Portal
        </span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
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

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="secondary"
          onClick={toggleMobileMenu}
          className="p-2"
        >
          {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="absolute top-full left-0 right-0 z-50 md:hidden"
          style={{ 
            backgroundColor: colors.cardBg,
            borderTop: `1px solid ${colors.borderColor}`,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation Links */}
            <Link 
              to="/dashboard" 
              className="block font-medium hover:opacity-80 transition-opacity flex items-center gap-3 py-2"
              style={{ color: colors.headerText }}
              onClick={closeMobileMenu}
            >
              <FiGrid size={18} />
              Dashboard
            </Link>
            <Link 
              to="/settings" 
              className="block font-medium hover:opacity-80 transition-opacity flex items-center gap-3 py-2"
              style={{ color: colors.headerText }}
              onClick={closeMobileMenu}
            >
              <FiSettings size={18} />
              Settings
            </Link>
            
            {/* Mobile Action Buttons */}
            <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: colors.borderColor }}>
              <Button
                variant="secondary"
                onClick={toggleDarkMode}
                className="flex-1 flex items-center justify-center gap-2 py-2"
              >
                {isDarkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 py-2"
              >
                <FiLogOut size={16} />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 