import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/notices/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNotice(data);
        }
      } catch (error) {
        console.error('Error fetching notice:', error);
      }
    };

    fetchNotice();
  }, [id]);

  return notice ? (
    <div>
      <h2>{notice.title}</h2>
      <p>{notice.content}</p>
      <p>
        <small>작성 시간: {new Date(notice.createdAt).toLocaleString()}</small>
      </p>
      {userRole?.role === 'admin' && (
        <button onClick={() => navigate(`/notices/edit/${id}`)}>수정</button>
      )}
    </div>
  ) : (
    <p>로딩 중...</p>
  );
}

export default NoticeDetail;
