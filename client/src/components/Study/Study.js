import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import studyLogo from '../../icons/cube.png';
import './Study.css';

function Study() {
  const [studyRooms, setStudyRooms] = useState([]);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudyRooms = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/study`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStudyRooms(data);
        } else {
          console.error('Failed to fetch study rooms:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching study rooms:', error);
      }
    };

    fetchStudyRooms();
  }, [authToken]);

  const handleCreateStudyRoom = () => {
    navigate('/study/create'); // 생성 페이지로 이동
  };

  const handleCardClick = (id) => {
    navigate(`/study/${id}`);
  };


  return (
    <div className="study-container">
      {authToken && (
        <button onClick={handleCreateStudyRoom} className="create-study-button">
          스터디룸 생성
        </button>
      )}
      <div className="study-grid-container">
        <div className="study-grid">
          {studyRooms.map((room) => (
            <div key={room._id} className="study-card" onClick={() => handleCardClick(room._id)}>
              <img src={studyLogo} alt="Study Icon" className="room-icon"/>
              <p>{room.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Study;
