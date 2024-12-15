import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfileEdit.css';

function ProfileEdit() {
  const { authToken, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(userRole?.name || '');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [preview, setPreview] = useState(
    userRole?.profileImage
      ? `${process.env.REACT_APP_API_URL}/${userRole.profileImage}`
      : 'default-avatar.png'
  );

  if (!authToken) {
    navigate('/login');
    return null;
  }

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      if (profileImageFile) {
        formData.append('profileImage', profileImageFile);
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('회원정보가 수정되었습니다.');
        navigate('/profile');
      } else {
        alert('회원정보 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-edit-container">
      <div className="profile-edit-card">
        <h2>회원정보 수정</h2>
        <div className="profile-edit-avatar-container">
          <label className="profile-edit-image-button">
            {preview ? (
              <img
                src={preview}
                alt="프로필 사진 미리보기"
                className="profile-edit-avatar-preview"
              />
            ) : (
              <span className="profile-edit-image-placeholder">사진 선택</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <p>
          <strong>이름:</strong>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="profile-edit-input"
          />
        </p>
        <button className="save-button" onClick={handleSave}>
          저장
        </button>
        <button className="cancel-button" onClick={() => navigate('/profile')}>
          취소
        </button>
      </div>
    </div>
  );
}

export default ProfileEdit;
