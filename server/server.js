const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const introRoutes = require('./routes/introRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const studyRoutes = require('./routes/studyRoutes');
const memberRoutes = require('./routes/memberRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // 요청 본문 크기 제한 설정
app.use(express.urlencoded({ limit: '10mb', extended: true })); // URL-encoded 크기 제한
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', express.static('uploads'));
app.use('/uploads/photos', express.static('uploads/photos'));

const PORT = process.env.PORT || 5000;

// Middleware 설정
app.use(express.json()); // JSON 요청 바디 파싱

// MongoDB 연결
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error('MongoDB connection error:', err));


// 라우트 설정
app.use('/api/auth', authRoutes); // 사용자 인증 관련
app.use('/api/intro', introRoutes); // 동아리 소개글 관련
app.use('/api/notices', noticeRoutes); // 공지사항 관련
app.use('/api/schedules', scheduleRoutes); // 일정 관련
app.use('/api/gallery', galleryRoutes); // 갤러리 관련
app.use('/api/study', studyRoutes); // 스터디 관련
app.use('/api/members', memberRoutes); // 멤버 관련


// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
