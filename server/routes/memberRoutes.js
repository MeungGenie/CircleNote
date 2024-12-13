const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User 모델 import

router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // 모든 유저 검색
    res.json(users); // JSON 형태로 응답
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;