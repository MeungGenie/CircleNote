import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StudyPostCreate.css';

function StudyPostCreate() {
  const { id } = useParams(); // 스터디룸 ID
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/study/${id}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('게시글이 생성되었습니다.');
        navigate(`/study/${id}`); // 작성 완료 후 스터디룸으로 이동
      } else {
        const errorData = await response.json();
        console.error('Error creating post:', errorData);
        alert('게시글 생성 실패');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="study-post-create-container">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-textarea"
        ></textarea>
        <button type="submit" className="submit-button">저장</button>
      </form>
    </div>
  );
}

export default StudyPostCreate;
