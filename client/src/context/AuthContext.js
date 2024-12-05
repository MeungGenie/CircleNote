import React, { createContext, useState, useEffect } from 'react';

// AuthContext 생성
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    // 로그인 시 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', token);
    setAuthToken(token);
  };

  const logout = () => {
    // 로그아웃 시 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
