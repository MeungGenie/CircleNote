import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const { authToken, userRole, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authToken) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEdit = () => {
    navigate('/profile/edit');
  };

  console.log('User Role:', userRole); // 역할 정보 확인
  console.log('Profile Image:', userRole?.profileImage); // 이미지 경로 확인

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>회원정보</h2>
        <div className="profile-details">
          <div className="profile-avatar-container">
            <img
              src={`${process.env.REACT_APP_API_URL}/${userRole?.profileImage || 'default-avatar.png'}`}
              alt="프로필 사진"
              className="profile-avatar"
            />
          </div>
          <p>
            <strong>이름:</strong> {userRole?.name || '이름 없음'}
          </p>
          <p>
            <strong>역할:</strong> {userRole?.role === 'admin' ? '임원진' : '일반부원'}
          </p>
        </div>
        <div className="profile-actions">
          <button className="edit-button" onClick={handleEdit}>
            수정
          </button>
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
