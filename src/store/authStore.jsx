import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    // For development: use hardcoded token, fallback to localStorage
    const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOnsidmFsaWQiOnRydWUsInVzZXJJZCI6ImI1NjgzMmNlLWI3MGQtNDAyZS04ODRiLTlmYzVmYjk3MjFiMSJ9LCJpYXQiOjE3NTM5OTYwNjIsImV4cCI6MTc1Mzk5Njk2Mn0.jXed8eXYwSn7C-_dXahpwUGGjVuyXFPtzlOwkgd2sGs";
    const storedToken = localStorage.getItem('authToken');
    const token = hardcodedToken || storedToken;
    
    if (token) {
      setToken(token);
    }
    setLoading(false);
  }, []);

  // Update auth state when tokens change in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // For development: use hardcoded token, fallback to localStorage
      const hardcodedToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOnsidmFsaWQiOnRydWUsInVzZXJJZCI6ImI1NjgzMmNlLWI3MGQtNDAyZS04ODRiLTlmYzVmYjk3MjFiMSJ9LCJpYXQiOjE3NTM5OTYwNjIsImV4cCI6MTc1Mzk5Njk2Mn0.jXed8eXYwSn7C-_dXahpwUGGjVuyXFPtzlOwkgd2sGs";
      const storedToken = localStorage.getItem('authToken');
      const token = hardcodedToken || storedToken;
      setToken(token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('authToken', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    setUser,
    setToken, // Add setToken to the context
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