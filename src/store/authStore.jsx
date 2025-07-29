import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/authUtils';
import { refreshToken as refreshTokenApi } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken, refreshTokenValue) => {
    setUser(userData);
    setToken(authToken);
    setRefreshToken(refreshTokenValue);
    saveToken(authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    removeToken();
  };

  const refreshAuthToken = async () => {
    if (!refreshToken) return false;
    
    try {
      const response = await refreshTokenApi({ refreshToken });
      if (response.token) {
        setToken(response.token);
        setRefreshToken(response.refreshToken);
        saveToken(response.token);
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