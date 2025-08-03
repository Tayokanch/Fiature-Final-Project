export const getThemeColors = (isDarkMode) => ({
  // Backgrounds
  bg: isDarkMode ? '#000000' : '#EAEAEA',
  cardBg: isDarkMode ? '#1E1E1E' : '#FAFAFA',

  // Text
  textColor: isDarkMode ? 'gray' : '#1A1A1A',
  secondaryTextColor: isDarkMode ? '#B3B3B3' : '#555555',

  // Icons (Brand Color)
  iconColor: isDarkMode ? '#D4AF37' : '#D4AF37',

  // Inputs
  inputBg: isDarkMode ? '#1C1C1C' : '#FFFFFF',
  inputText: isDarkMode ? '#FFFFFF' : '#1C1C1C',
  inputPlaceholder: '#6c6c6c',

  // Buttons
  brandButtonBg: isDarkMode ? '#D4AF37' : '#D4AF37',
  brandButtonText: isDarkMode ? '#1C1C1C' : '#FFFFFF',

  // Header
  headerText: isDarkMode ? '#FFFFFF' : '#1C1C1C',

  // Dashboard Specific
  dashboardTextColor: isDarkMode ? 'gray' : '#9C7C00',
  dashboardCircleCardBg: isDarkMode ? '#000000' : '#f5f5f5',

  // Borders
  borderColor: isDarkMode ? '#333333' : '#E5E5E5',

  // Misc
  modalBg: isDarkMode ? '#1E1E1E' : '#EAEAEA',
  borderWidth: '0.3px',
}); 