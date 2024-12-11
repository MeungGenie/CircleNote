const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule.js');

// 일정 가져오기
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: 'Error fetching schedules' });
  }
});

// 일정 추가하기
router.post('/', async (req, res) => {
  const { title, start, end } = req.body;
  try {
    const newSchedule = new Schedule({ title, start, end });
    await newSchedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ message: 'Error creating schedule' });
  }
});

module.exports = router;
