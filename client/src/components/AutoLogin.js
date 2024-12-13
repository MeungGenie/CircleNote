import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AutoLogin() {
  const navigate = useNavigate();
  const { setAuthToken, setUserRole } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      // 토큰 저장
      localStorage.setItem('authToken', token);
      setAuthToken(token);

      // 사용자 역할 가져오기
      fetch('http://localhost:5001/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserRole(data.role);
          navigate('/'); // 홈 화면으로 이동
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
          navigate('/login'); // 실패 시 로그인 페이지로 이동
        });
    } else {
      navigate('/login'); // 토큰 없으면 로그인 페이지로 이동
    }
  }, [navigate, setAuthToken, setUserRole]);

  return <div>자동 로그인 중입니다...</div>;
}

export default AutoLogin;
