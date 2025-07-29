import React, { createContext, useContext, useState, useEffect } from 'react';
import { refreshToken as refreshTokenApi } from '../services/apiAuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken, refreshTokenValue) => {
    setUser(userData);
    setToken(authToken);
    setRefreshToken(refreshTokenValue);
    localStorage.setItem('authToken', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  const refreshAuthToken = async () => {
    if (!refreshToken) return false;
    
    try {
      const response = await refreshTokenApi({ refreshToken });
      
      // Handle both direct token response and nested result response
      let newToken, newRefreshToken;
      
      if (response.result && response.result.token) {
        // Nested result structure
        newToken = response.result.token;
        newRefreshToken = response.result.refreshToken;
      } else if (response.token) {
        // Direct token structure
        newToken = response.token;
        newRefreshToken = response.refreshToken;
      }
      
      if (newToken) {
        setToken(newToken);
        if (newRefreshToken) {
          setRefreshToken(newRefreshToken);
        }
        localStorage.setItem('authToken', newToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    
    logout();
    return false;
  };

  const value = {
    user,
    token,
    refreshToken,
    loading,
    login,
    logout,
    refreshAuthToken,
    setUser,
    setToken,
    setRefreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 