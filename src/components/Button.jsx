import React from 'react';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';

const Button = ({ 
  children, 
  variant = 'primary', 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const getVariantClasses = () => {
    if (disabled) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }

    switch (variant) {
      case 'primary':
        return 'cursor-pointer hover:opacity-90';
      case 'secondary':
        return 'cursor-pointer hover:opacity-90';
      default:
        return 'cursor-pointer hover:opacity-90';
    }
  };

  const getVariantStyles = () => {
    if (disabled) {
      return {
        backgroundColor: '#9CA3AF',
        color: '#6B7280',
        cursor: 'not-allowed'
      };
    }

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.brandButtonBg,
          color: colors.brandButtonText,
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${colors.brandButtonBg}`,
          color: colors.brandButtonBg,
        };
      default:
        return {
          backgroundColor: colors.brandButtonBg,
          color: colors.brandButtonText,
        };
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${getVariantClasses()} ${className}`}
      style={{
        ...getVariantStyles(),
        '--tw-ring-color': colors.iconColor
      }}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 