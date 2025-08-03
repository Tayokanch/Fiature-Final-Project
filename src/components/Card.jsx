import React from 'react';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';

const Card = ({ 
  children, 
  className = '', 
  variant = '', 
  ...props 
}) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  const getVariantClasses = () => {
    switch (variant) {
      case 'balance':
        return 'border';
      case 'stats':
        return `bg-blue-50 dark:bg-blue-900/20`;
      default:
        return '';
    }
  };

  return (
    <div 
      className={`rounded-lg shadow-lg p-6 ${getVariantClasses()} ${className}`}
      style={{ 
        backgroundColor: colors.cardBg,
        borderColor: variant === 'balance' ? colors.borderColor : undefined
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card; 