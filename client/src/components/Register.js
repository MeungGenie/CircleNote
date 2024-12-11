// Updated Register.js
import React, { useState } from 'react';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [adminPassword, setAdminPassword] = useState('');
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImageFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !name || !password) {
      alert('Please fill out all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('name', name);
    formData.append('password', password);
    formData.append('role', role);
    if (role === 'admin') {
      formData.append('adminPassword', adminPassword);
    }
    if (profileImageFile) {
      formData.append('profileImage', profileImageFile);
    }

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        throw new Error('Failed to register');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="profile-image-container">
          <label className="profile-image-button">
            {profileImageFile ? (
              <img
                src={URL.createObjectURL(profileImageFile)}
                alt="Selected Profile"
                className="profile-image"
              />
            ) : (
              <span className="profile-image-placeholder">사진 선택</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </label>
        </div>
        <input
          className="input-field"
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="role-selection">
          <label>
            <input
              type="radio"
              value="일원"
              checked={role === '일원'}
              onChange={(e) => setRole(e.target.value)}
            />
            Member
          </label>
          <label>
            <input
              type="radio"
              value="관리자"
              checked={role === '관리자'}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
        </div>

        {role === 'admin' && (
          <input
            className="input-field admin-password-field"
            type="password"
            placeholder="관리자 비밀번호"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
        )}

        <button className="submit-button" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
