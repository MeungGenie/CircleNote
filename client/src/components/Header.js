import React from 'react';
import { useAuth } from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import darakLogo from './darak_logo.png';

function Header() {
  const { authToken, user, logout } = useAuth();
  const navigate = useNavigate();

  return ( 
    <div className="header-container">
      <div className="logo-container">
        <img src= {darakLogo} alt="Club Logo" className="logo" />
      </div>
      <div className="auth-button-container">
        {authToken ? (
          <Link to="/profile" className="auth-button">회원정보</Link>
        ) : (
          <Link to="/login" className="auth-button">로그인</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
