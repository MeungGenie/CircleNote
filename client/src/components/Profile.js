import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const { authToken, setAuthToken, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authToken) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h2>회원정보</h2>
      <div className="profile-details">
        <img src={user.photo || '/default-avatar.png'} alt="프로필 사진" className="profile-avatar" />
        <p><strong>이름:</strong> {user.username}</p>
        <p><strong>역할:</strong> {user.role === 'admin' ? '임원진' : '일반부원'}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default Profile;
