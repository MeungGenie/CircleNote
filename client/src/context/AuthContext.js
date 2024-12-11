import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      fetchUserProfile();
    } else {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  }, [authToken]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setAuthToken(null);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);