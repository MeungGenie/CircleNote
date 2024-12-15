import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Folder.css';

function Folder() {
  const { folderId } = useParams();
  const { authToken, userRole } = useContext(AuthContext);
  const [folder, setFolder] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    if (!folderId) {
        console.error('No folder ID provided in URL');
        return;
    }

    const fetchFolder = async () => {
      try {
        const response = await fetch(`/api/gallery/${folderId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          setFolder(data);
          if (data.images && data.images.length > 0) setSelectedImage(data.images[0]); // 첫 번째 이미지를 선택
        } else {
          console.error('Failed to fetch folder');
        }
      } catch (error) {
        console.error('Error fetching folder:', error);
      }
    };
  
    fetchFolder();
  }, [folderId]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append('photo', uploadedFile);

    try {
        const response = await fetch(`/api/gallery/${folderId}/add-photo`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${authToken}` },
            body: formData,
        });

        if (response.ok) {
            const updatedFolder = await response.json();
            setFolder(updatedFolder);
            alert('사진이 추가되었습니다!');
        } else {
            alert('사진 추가 실패!');
        }
    } catch (error) {
        console.error('Error uploading photo:', error);
    }
};


const handleDeletePhoto = async (imageUrl) => {
    const confirmDelete = window.confirm('사진을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {

        console.log(selectedImage)
        
        const response = await fetch(`/api/gallery/${folderId}/delete-photo`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ imageUrl: selectedImage }),
        });

        if (response.ok) {
            const updatedFolder = await response.json();
            setFolder(updatedFolder);
            alert('사진이 삭제되었습니다!');
        } else {
            alert('사진 삭제 실패!');
        }
    } catch (error) {
        console.error('Error deleting photo:', error);
    }
};

const handleImageSelect = (imageUrl) => {
    console.log('Selected Image:', imageUrl);
    setSelectedImage(imageUrl);
  };

  return (
    <div className="folder-container">
        {authToken && (
            <div className="upload-section">
                <form onSubmit={handleFileUpload}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setUploadedFile(e.target.files[0])}
                    />
                    <button type="submit">사진 추가</button>
                </form>
            </div>
        )}
        <div className="folder-gallery-container">
            <div className="gallery-grid">
                {folder?.images.map((image, index) => (
                <img
                    key={index}
                    src={`/${image}`}
                    alt={`Gallery ${index}`}
                    className={`gallery-thumbnail ${selectedImage === image ? 'selected' : ''}`}
                    onClick={() => handleImageSelect(image)}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        if (userRole.role === 'admin') {
                            handleDeletePhoto(index);
                        } else {
                            alert('관리자만 삭제할 수 있습니다.');
                        }
                    }}
                />
                ))}
            </div>
            <div className="gallery-preview">
                {selectedImage ? (
                <img src={`/${selectedImage}`} alt="Selected" />
                ) : (
                <p>이미지를 선택하세요</p>
                )}
            </div>
        </div>
    </div>
  );
}

export default Folder;
