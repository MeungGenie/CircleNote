import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Edit.css';

function NoticesEdit() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams(); // 수정 중인 공지사항 ID (없으면 작성 모드)
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchNotice = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notices/${id}`);
          if (response.ok) {
            const data = await response.json();
            setTitle(data.title);
            setContent(data.content);
          }
        } catch (error) {
          console.error('Error fetching notice:', error);
        }
      };
      fetchNotice();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      const url = id
        ? `${process.env.REACT_APP_API_URL}/api/notices/${id}`
        : `${process.env.REACT_APP_API_URL}/api/notices`;

      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert(id ? '공지사항이 수정되었습니다.' : '공지사항이 작성되었습니다.');
        navigate('/');
      } else {
        alert('저장 실패');
      }
    } catch (error) {
      console.error('Error saving notice:', error);
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2>{id ? '공지사항 수정' : '공지사항 작성'}</h2>
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

export default NoticesEdit;
