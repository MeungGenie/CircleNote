import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home'
import Calendar from './components/Calendar';
import Gallery from './components/Gallery';
import Study from './components/Study';
import Members from './components/Members';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="header">
          <nav>
            <Link to="/home" className="tab" style={{ backgroundColor: '#F28C8C' }}>홈</Link>
            <Link to="/calendar" className="tab" style={{ backgroundColor: '#F28C8C' }}>캘린더</Link>
            <Link to="/gallery" className="tab" style={{ backgroundColor: '#FFD67E' }}>사진첩</Link>
            <Link to="/study" className="tab" style={{ backgroundColor: '#A8E6A2' }}>스터디</Link>
            <Link to="/members" className="tab" style={{ backgroundColor: '#88C5F1' }}>다락부원</Link>
          </nav>
        </div>
        <div className="content-container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/study" element={<Study />} />
            <Route path="/members" element={<Members />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;