import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Home from './components/Home/Home';
import Calendar from './components/Calendar/Calendar';
import Gallery from './components/Gallery/Gallery';
import Study from './components/Study/Study';
import Members from './components/Members/Members';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import IntroEdit from './components/Home/IntroEdit';
import NoticesEdit from './components/Home/NoticesEdit';
import NoticeDetail from './components/Home/NoticeDetail';
import FolderCreate from './components/Gallery/FolderCreate';
import Folder from './components/Gallery/Folder';
import StudyCreate from './components/Study/StudyCreate';
import StudyRoom from './components/Study/StudyRoom';
import StudyPostCreate from './components/Study/StudyPostCreate';
import StudyPostDetail from './components/Study/StudyPostDetail';
import AutoLogin from './components/AutoLogin';
import './App.css';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="vertical-layout">
          <Header/>
          <div className="app-container centered-container">
            <div className="content-container fixed-size">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/intro/edit" element={<IntroEdit />} />
                <Route path="/notices/edit" element={<NoticesEdit />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/study" element={<Study />} />
                <Route path="/members" element={<Members />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auto-login" element={<AutoLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/edit" element={<ProfileEdit />} />
                <Route path="/notices/edit" element={<NoticesEdit />} /> {/* 작성 */}
                <Route path="/notices/edit/:id" element={<NoticesEdit />} /> {/* 수정 */}
                <Route path="/notices/:id" element={<NoticeDetail />} />
                <Route path="/gallery/:folderId" element={<Folder />} />
                <Route path="/gallery/create" element={<FolderCreate />} />
                <Route path="/study/create" element={<StudyCreate />} /> {/* 스터디룸 생성 */}
                <Route path="/study/:id" element={<StudyRoom />} /> {/* 스터디룸 상세 */}
                <Route path="/study/:id/create-post" element={<StudyPostCreate />} />
                <Route path="/study/:studyRoomId/posts/:postId" element={<StudyPostDetail />} />
              </Routes>
            </div>
            <div className="side-tabs">
              <nav className="nav-tabs">
                <Link to="/" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#F28C8C' }}>홈</Link>
                <Link to="/calendar" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#FFD67E' }}>캘린더</Link>
                <Link to="/gallery" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#A8E6A2' }}>사진첩</Link>
                <Link to="/study" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#88C5F1' }}>스터디</Link>
                <Link to="/members" className="tab rectangle centered-text custom-shape" style={{ backgroundColor: '#CAABFF' }}>부원</Link>
              </nav>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
