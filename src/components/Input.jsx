import React, { useState } from 'react';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';

const Input = React.forwardRef(({ 
  label, 
  error, 
  className = '', 
  validate, 
  icon: Icon,
  ...props 
}, ref) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const [internalError, setInternalError] = useState('');

  const handleBlur = (event) => {
    if (validate) {
      const validationError = validate(event.target.value);
      setInternalError(validationError || '');
    }
    if (props.onBlur) props.onBlur(event);
  };

  const displayError = error || internalError;

  return (
    <div className="mb-4">
      {label && (
        <label 
          className="block mb-2 text-sm font-medium"
          style={{ color: colors.textColor }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon size={16} style={{ color: colors.iconColor }} />
          </div>
        )}
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[${colors.iconColor}] transition-all duration-200 ${
            displayError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          } ${Icon ? 'pl-10' : ''} ${className}`}
          style={{
            backgroundColor: colors.inputBg,
            color: colors.inputText,
          }}
          placeholder={props.placeholder}
          onBlur={handleBlur}
          {...props}
        />
      </div>
      {displayError && (
        <p className="text-red-500 text-xs mt-1">{displayError}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 