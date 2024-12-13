// models/StudyRoom.js
const mongoose = require('mongoose');

const studyRoomSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
});

module.exports = mongoose.model('StudyRoom', studyRoomSchema);
