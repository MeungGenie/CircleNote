import React from 'react';
import './Home.css';
import logo from '../../darak_logo.png';

function Home() {
  return (
    <div className="home-layout">
      <div className="home-logo-container">
        <img src={logo} alt="Club Logo" className="home-logo" />
      </div>
      <div className="home-info-container">
        <div className="home-description">
          <h2>동아리 소개글</h2>
          <p>다락방은 ~~~</p>
        </div>
        <div className="home-announcement">
          <h3>📢 공지사항</h3>
          <ul>
            <li>공지 1</li>
            <li>공지 2</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
