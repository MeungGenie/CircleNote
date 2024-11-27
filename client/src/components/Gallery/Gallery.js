import React from 'react';
import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import folderLogo from './folder.png';

function Gallery() {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/gallery-details'); // 임시로 다른 페이지로 이동
  };

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        <div className="gallery-card" onClick={handleCardClick}>
          <img src= {folderLogo} alt="Folder Icon" className="folder-icon" />
          <p>2022_1학기_개강파티</p>
        </div>
        <div className="gallery-card" onClick={handleCardClick}>
          <img src= {folderLogo} alt="Folder Icon" className="folder-icon" />
          <p>2022_1학기_MT</p>
        </div>
        <div className="gallery-card" onClick={handleCardClick}>
          <img src= {folderLogo} alt="Folder Icon" className="folder-icon" />
          <p>2022_1학기_종강파티</p>
        </div>
        <div className="gallery-card" onClick={handleCardClick}>
          <img src= {folderLogo} alt="Folder Icon" className="folder-icon" />
          <p>2022_2학기_개강파티</p>
        </div>
        <div className="gallery-card" onClick={handleCardClick}>
          <img src= {folderLogo} alt="Folder Icon" className="folder-icon" />
          <p>2022_2학기_MT</p>
        </div>
        <div className="gallery-card" onClick={handleCardClick}>
          <img src= {folderLogo} alt="Folder Icon" className="folder-icon" />
          <p>2022_2학기_종강파티</p>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
