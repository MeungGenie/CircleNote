import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <div className="main-content">
      <h2>동아리 소개글</h2>
      <p>다락방은 ~~~</p>
      <div className="notice">
        <h3>📢 공지사항</h3>
        <ul>
          <li>공지 1</li>
          <li>공지 2</li>
        </ul>
      </div>
    </div>
  );
}

export default MainContent;