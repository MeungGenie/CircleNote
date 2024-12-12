import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FolderCreate.css';

function FolderCreate() {
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
  
    if (images.length > 0) {
        images.forEach((image) => formData.append('images', image));
    }
  
    try {
      const response = await fetch('http://localhost:5001/api/gallery', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to create folder');
      }
  
      const data = await response.json();
      console.log('Folder created:', data);
    } catch (error) {
      console.error('Error creating folder:', error);
    }

    navigate("/gallery");
  };

  const handleCancel = () => {
    setTitle('');
    setImages(null);
    navigate("/gallery");
  };
  

  return (
    <div className="folder-create-container">
      <div className="folder-create-card">
        <h2>폴더 생성</h2>
        <label htmlFor="folder-name">폴더 제목</label>
        <input
          type="text"
          id="folder-name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="폴더 이름을 입력하세요"
        />
        <div className="file-input-container">
          <label htmlFor="file-input">파일 선택</label>
          <input
            type="file"
            id="file-input"
            onChange={handleImageChange}
          />
        </div>
        <div className="button-container">
          <button onClick={handleSubmit} className="save-button">저장</button>
          <button onClick={handleCancel} className="cancel-button">취소</button>
        </div>
      </div>
    </div>
  );
}

export default FolderCreate;
