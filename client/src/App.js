import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Calendar from './components/Calendar/Calendar';
import Gallery from './components/Gallery/Gallery';
import Study from './components/Study/Study';
import Members from './components/Members/Members';
import darakLogo from './darak_logo.png'
import './App.css';

function App() {
  return (
      <Router>
        <div className="vertical-layout">
          <div className="logo-container">
            <img src= {darakLogo} alt="Club Logo" className="club-logo" />
          </div>
          <div className="app-container centered-container">
            <div className="content-container fixed-size">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/study" element={<Study />} />
                <Route path="/members" element={<Members />} />
              </Routes>
            </div>
            <div className="side-tabs">
              <nav className="nav-tabs">
                <Link to="/home" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#F28C8C' }}>홈</Link>
                <Link to="/calendar" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#FFD67E' }}>캘린더</Link>
                <Link to="/gallery" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#A8E6A2' }}>사진첩</Link>
                <Link to="/study" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#88C5F1' }}>스터디</Link>
                <Link to="/members" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#CAABFF' }}>부원</Link>
              </nav>
            </div>
          </div>
        </div>
      </Router>
  );
}

export default App;
