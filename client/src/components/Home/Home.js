import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import darakLogo from '../../darak_logo.png';

function Home() {
  const [notices, setNotices] = useState([]);
  const [intro, setIntro] = useState([]);
  const { userRole } = useAuth(); // 사용자 역할 확인
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [introResponse, noticeResponse] = await Promise.all([
          fetch('http://localhost:5001/api/intro'),
          fetch('http://localhost:5001/api/notices'),
        ]);

        if (introResponse.ok) {
          const introData = await introResponse.json();
          setIntro(introData);
        }

        if (noticeResponse.ok) {
          const noticeData = await noticeResponse.json();
          setNotices(noticeData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
    
  return (
    <div className="home-container">
      <div className="home-logo-container">
        <img src= {darakLogo} alt="로고" className="home-logo" />
      </div>
      <div className="home-info-container">
        <div className="home-introduction">
          {intro ? (
            <>
              <h2>{intro.title}</h2>
              {userRole?.role === 'admin' && (
                <button
                onClick={() => navigate('/intro/edit')} className='edit-button'>
                  수정
                </button>
              )}
              <p>{intro.content}</p>
            </>
          ) : (
            <p>소개글을 불러오는 중입니다...</p>
          )}
        </div>
        <div className="home-notices">
          <h2>📢 공지사항</h2>
          {userRole?.role === 'admin' && (
            <button onClick={() => navigate('/notices/edit')} className="edit-button">
              글쓰기
            </button>
            )}
            {notices.length > 0 ? (
            notices.map((notice) => (
              <div key={notice._id}>
                <h3>{notice.title}</h3>
                <p>{notice.content}</p>
              </div>
            ))
          ) : (
            <p>공지사항이 없습니다.</p>
          )}
        </div>  
      </div>
    </div>
  );
}

export default Home;
