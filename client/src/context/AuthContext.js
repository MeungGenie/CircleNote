import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
      fetchUserProfile();
    } else {
      localStorage.removeItem('authToken');
      setUserRole(null);
    }
  }, [authToken]);

  const fetchUserProfile = async () => {
    try {
      console.log('Authorization Header:', `Bearer ${authToken}`);
      const response = await axios.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUserRole(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setAuthToken(null);
      localStorage.removeItem('authToken');
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUserRole(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, userRole, setUserRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
