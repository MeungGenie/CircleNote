import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StudyRoom.css';

function StudyRoom() {
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const [posts, setPosts] = useState([]);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/study/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (response.ok) {
          const { room, posts } = await response.json();
          setRoom(room);
          setPosts(posts);
        } else {
          console.error('Failed to fetch room details:', await response.json());
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    fetchRoomDetails();
  }, [id, authToken]);

  return (
    <div className="study-room-container">
      <h2 className="study-room-title">{room.title}</h2>
      <p className="study-room-description">{room.description}</p>
      <button className="create-post-button" onClick={() => navigate(`/study/${id}/create-post`)}>게시글 작성</button>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post._id} className="post-item" onClick={() => navigate(`/study/${id}/posts/${post._id}`)}>
            <h3 className="post-title">{post.title}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudyRoom;
