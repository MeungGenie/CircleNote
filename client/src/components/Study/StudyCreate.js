import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StudyCreate.css';

function StudyCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { authToken, } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/study', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        alert('스터디룸이 생성되었습니다.');
        navigate('/study'); // 스터디 페이지로 이동
      } else {
        alert('스터디룸 생성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error creating study room:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="study-create-container">
        <div className="study-create-card">
            <h2>스터디룸 생성</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value={title}
                className='study-input'
                onChange={(e) => setTitle(e.target.value)}
                placeholder="스터디룸 제목"
                required
                />
                <textarea
                value={description}
                className='study-textarea'
                onChange={(e) => setDescription(e.target.value)}
                placeholder="스터디룸 설명"
                rows="4"
                required
                />
                <button type="submit">생성</button>
            </form>
        </div>
    </div>
  );
}

export default StudyCreate;
