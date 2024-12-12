const mongoose = require('mongoose');

const GalleryFolderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String }], // 사진 경로 배열
}, { timestamps: true });

module.exports = mongoose.model('GalleryFolder', GalleryFolderSchema);
