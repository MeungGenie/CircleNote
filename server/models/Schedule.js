const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
