import { useThemeStore } from '../store/themeStore';
import { getThemeColors } from '../styles/theme';

export const useTheme = () => {
  const { isDarkMode, setIsDarkMode } = useThemeStore();
  const colors = getThemeColors(isDarkMode);
  return {
    isDarkMode,
    setIsDarkMode,
    colors,
  };
}; 