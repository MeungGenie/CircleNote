import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import folderLogo from '../../icons/folder.png';

function Gallery() {
  const [folders, setFolders] = useState([]);
  const navigate = useNavigate();

  const handleFolderClick = (folderId) => {
    if (!folderId) {
      console.error('Folder ID is undefined');
      return;
    }
    navigate(`/gallery/${folderId}`); // ID가 포함된 경로로 이동
  };
  

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setFolders(data);
    };
    fetchFolders();
  }, []);

  return (
    <div className="gallery-container">
      <button className="add-folder-button" onClick={() => navigate('/gallery/create')}>폴더 생성</button>
      <div className="gallery-grid-container">
        <div className="gallery-other-grid">
          {folders.map((folder) => (
            <div key={folder._id} className="gallery-card" onClick={() => handleFolderClick(folder._id)}>
              <img src={folderLogo} alt="Folder Icon" className="folder-icon" />
              <p>{folder.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;