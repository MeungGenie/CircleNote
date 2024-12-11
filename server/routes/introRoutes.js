const express = require('express');
const Intro = require('../models/Intro');

const router = express.Router();

// 소개글 가져오기 (항상 한 개만 보여짐)
router.get('/', async (req, res) => {
  try {
    const intro = await Intro.findOne();
    if (!intro) {
      return res.status(404).json({ message: 'Intro not found' });
    }
    res.json(intro);
  } catch (error) {
    console.error('Error fetching intro:', error);
    res.status(500).json({ message: 'Error fetching intro' });
  }
});

// 소개글 생성 또는 업데이트
router.put('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    let intro = await Intro.findOne();

    if (!intro) {
      intro = new Intro({ title, content });
    } else {
      intro.title = title;
      intro.content = content;
    }

    await intro.save();
    res.status(200).json({ message: 'Intro saved successfully' });
  } catch (error) {
    console.error('Error saving intro:', error);
    res.status(500).json({ message: 'Error saving intro' });
  }
});

module.exports = router;
