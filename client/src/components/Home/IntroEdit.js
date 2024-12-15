import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Edit.css';

function IntroEdit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/intro`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title || '');
          setContent(data.content || '');
        }
      } catch (error) {
        console.error('Error fetching intro:', error);
      }
    };
    fetchIntro();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/intro`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('소개글이 저장되었습니다.');
        navigate('/');
      } else {
        alert('저장 실패');
      }
    } catch (error) {
      console.error('Error updating intro:', error);
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>소개글 수정</h2>
        <input
          className="edit-input"
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="edit-textarea"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="edit-buttons">
          <button className="save-button" onClick={handleSave}>저장</button>
          <button className="cancel-button" onClick={() => navigate('/')}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default IntroEdit;
