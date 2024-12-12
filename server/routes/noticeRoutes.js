const express = require('express');
const Notice = require('../models/Notice');

const router = express.Router();

// 공지사항 목록 가져오기
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }); // 최신 공지사항 순
    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Error fetching notices', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }
    res.json(notice);
  } catch (error) {
    console.error('Error fetching notice:', error);
    res.status(500).json({ message: 'Error fetching notice', error });
  }
});

// 공지사항 작성
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNotice = new Notice({ title, content });
    await newNotice.save();
    res.status(201).json(newNotice); // 작성된 공지사항 반환
  } catch (error) {
    console.error('Error saving notice:', error);
    res.status(500).json({ message: 'Error saving notice', error });
  }
});


// 공지사항 수정
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true } // 수정 후 최신 데이터를 반환
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.json(updatedNotice);
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ message: 'Error updating notice', error });
  }
});


// 공지사항 삭제
router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({ message: 'Error deleting notice' });
  }
});

module.exports = router;
