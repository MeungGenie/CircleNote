const express = require('express');
const Notice = require('../models/Notice');

const router = express.Router();

// 공지사항 목록 가져오기
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Error fetching notices' });
  }
});

// 공지사항 추가
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNotice = new Notice({ title, content });
    await newNotice.save();
    res.status(201).json({ message: 'Notice created successfully' });
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({ message: 'Error creating notice' });
  }
});

// 공지사항 수정
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({ message: 'Notice not found' });
    }

    notice.title = title;
    notice.content = content;
    notice.updatedAt = Date.now();

    await notice.save();
    res.status(200).json({ message: 'Notice updated successfully' });
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ message: 'Error updating notice' });
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
