import React from 'react';
import './Header.css';

function Header({ activeTab, setActiveTab }) {
  const tabs = ['캘린더', '사진첩', '스터디', '다락부원'];

  return (
    <div className="header">
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            style={{
              backgroundColor: activeTab === tab
                ? '#555' // 활성화된 탭의 색상
                : tab === '캘린더'
                ? '#F28C8C'
                : tab === '사진첩'
                ? '#FFD67E'
                : tab === '스터디'
                ? '#A8E6A2'
                : '#88C5F1',
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Header;