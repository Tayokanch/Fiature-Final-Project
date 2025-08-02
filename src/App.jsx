import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/authStore';
import { ThemeProvider } from './store/themeStore';
import AppRoutes from './routes/AppRoutes';
import { setUpdateAuthToken } from './services/api';

// Component to connect AuthStore with API service
const AuthConnector = ({ children }) => {
  const { setToken } = useAuth();
  
  React.useEffect(() => {
    setUpdateAuthToken(setToken);
  }, [setToken]);
  
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AuthConnector>
          <Router>
            <AppRoutes />
          </Router>
        </AuthConnector>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
