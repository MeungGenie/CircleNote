import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function IntroEdit() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // 기존 소개글 가져오기
    const fetchIntro = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/intro');
        if (response.ok) {
          const data = await response.json();
          setContent(data.content || '');
        }
      } catch (error) {
        console.error('Error fetching intro:', error);
      }
    };

    fetchIntro();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/intro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        alert('동아리 소개글이 저장되었습니다.');
        navigate('/home');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error updating intro:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="동아리 소개글을 입력하세요."
        rows="6"
        style={{ width: '100%', padding: '10px' }}
      />
      <button type="submit">저장</button>
    </form>
  );
}

export default IntroEdit;
