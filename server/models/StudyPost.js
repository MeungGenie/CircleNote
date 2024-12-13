const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

const studyPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    studyRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyRoom', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [commentSchema], 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const StudyPost = mongoose.model('StudyPost', studyPostSchema);
module.exports = StudyPost;
