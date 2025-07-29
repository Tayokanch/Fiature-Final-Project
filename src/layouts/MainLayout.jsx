import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTheme } from '../store/themeStore';
import { getThemeColors } from '../utils/themeUtils';

const MainLayout = () => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.bg }}
    >
      <Navbar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout; 