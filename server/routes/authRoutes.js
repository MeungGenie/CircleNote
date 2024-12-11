// Updated authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// multer 설정 (파일 업로드 처리)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB 크기 제한
});

// 임원진 비밀번호 설정
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'secretPassword123';

// 회원가입 라우트
router.post('/register', upload.single('profileImage'), async (req, res) => {
  try {
    const { username, name, password, role, adminPassword } = req.body;

    if (!username|| !name || !password) {
      return res.status(400).json({ message: 'Username, Name, and Password are required' });
    }

    // ID 중복 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'userName already exists' });
    }

    // 임원진 비밀번호 검증
    if (role === 'admin' && adminPassword !== ADMIN_PASSWORD) {
      return res.status(403).json({ message: 'Invalid admin password' });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = new User({
      username,
      name,
      password: hashedPassword,
      role,
      profileImage: req.file ? `uploads/${req.file.filename}` : null,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Duplicate key error', error });
    } else {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 토큰 생성
    const token = jwt.sign({ username: user.usernmae }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



// 프로필 정보 라우트
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      username: user.username,
      name: user.name,
      role: user.role,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
});

module.exports = router;
