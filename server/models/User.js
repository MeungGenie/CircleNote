const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // 고유 필드
  name: { type: String, required: true },            // 필수 필드
  password: { type: String, required: true },        // 필수 필드
  role: { type: String, default: 'member' },
  profileImage: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
