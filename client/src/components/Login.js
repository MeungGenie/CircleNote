import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken, setUserRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        setAuthToken(data.token); // AuthContext에 토큰 설정
        setUserRole(data.role); // 사용자 역할 설정
        localStorage.setItem('authToken', data.token); // 로컬 스토리지에 저장
        localStorage.setItem('userRole', data.role); // 역할 저장
        navigate(`/?token=${data.token}`);
      } else {
        console.error('Login failed');
        alert('로그인 실패: 아이디나 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  

  return (
    <div className='login-container'>
      <form className="login-card" onSubmit={handleLogin}>
        <h2>로그인</h2>
        <input
          className="login-input"
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">로그인</button>
        <button
          className="register-button"
          type="button"
          onClick={() => navigate('/register')}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Login;
