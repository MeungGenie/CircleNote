// Updated NoticesEdit.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NoticesEdit() {
  const [notices, setNotices] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 기존 공지사항 가져오기
    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/notices');
        if (response.ok) {
          const data = await response.json();
          setNotices(data.content || '');
        }
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: notices }),
      });

      if (response.ok) {
        alert('공지사항이 저장되었습니다.');
        navigate('/home');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating notices:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={notices}
        onChange={(e) => setNotices(e.target.value)}
        placeholder="공지사항 내용을 입력하세요."
        rows="6"
        style={{ width: '100%', padding: '10px' }}
      />
      <button type="submit">저장</button>
    </form>
  );
}

export default NoticesEdit;