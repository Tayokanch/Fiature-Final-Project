import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './store/authStore';
import { ThemeProvider } from './store/themeStore';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
