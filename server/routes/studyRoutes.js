// routes/studyRoutes.js
const express = require('express');
const StudyRoom = require('../models/StudyRoom');
const StudyPost = require('../models/StudyPost');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// 스터디룸 목록 가져오기
router.get('/', authMiddleware, async (req, res) => {
    try {
      const studyRooms = await StudyRoom.find();
      res.status(200).json(studyRooms);
    } catch (error) {
      console.error('Error fetching study rooms:', error);
      res.status(500).json({ message: '스터디룸을 가져오는 중 오류가 발생했습니다.' });
    }
  });

// 스터디룸 생성
router.post('/', authMiddleware, async (req, res) => {
    try {
      const { title, description } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({ message: '제목과 설명을 입력해주세요.' });
      }
  
      const newRoom = new StudyRoom({ title, description });
      await newRoom.save();
  
      res.status(201).json({ message: '스터디룸이 생성되었습니다.', room: newRoom });
    } catch (error) {
      console.error('Error creating study room:', error);
      res.status(500).json({ message: '스터디룸 생성 중 오류가 발생했습니다.', error });
    }
  });
  

// 스터디룸 상세 정보와 게시글 가져오기
router.get('/:roomId', authMiddleware, async (req, res) => {
    try {
      const { roomId } = req.params;
  
      const room = await StudyRoom.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: '스터디룸을 찾을 수 없습니다.' });
      }
  
      const posts = await StudyPost.find({ studyRoom: roomId }).populate('author');
  
      res.status(200).json({ room, posts });
    } catch (error) {
      console.error('Error fetching room details:', error);
      res.status(500).json({ message: '스터디룸 정보를 가져오는 중 오류가 발생했습니다.', error });
    }
  });
  

// 스터디룸 게시글 작성
router.post('/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { content } = req.body;

    const newPost = new StudyPost({
      studyRoom: roomId,
      author: req.user.id,
      content,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: '게시글 작성 중 오류가 발생했습니다.' });
  }
});

// 스터디룸 가입
router.post('/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await StudyRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: '스터디룸을 찾을 수 없습니다.' });
    }

    if (!room.members.includes(req.user.id)) {
      room.members.push(req.user.id);
      await room.save();
    }

    res.status(200).json(room);
  } catch (error) {
    console.error('Error joining study room:', error);
    res.status(500).json({ message: '스터디룸 가입 중 오류가 발생했습니다.' });
  }
});


// 게시글 생성
router.post('/:roomId/posts', authMiddleware, async (req, res) => {
    try {
      const { roomId } = req.params;
      const { title, content } = req.body;
      const user = await User.findOne({ username: req.user.username });

      if (!title || !content) {
        return res.status(400).json({ message: '제목과 내용을 모두 입력하세요.' });
      }
  
      const room = await StudyRoom.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: '스터디룸을 찾을 수 없습니다.' });
      }

      console.log(`Request User: ${req.user.id}`);
  
      const newPost = new StudyPost({
        title,
        content,
        studyRoom: roomId,
        author: user.id,
      });
  
      await newPost.save();
  
      res.status(201).json({ message: '게시글이 성공적으로 생성되었습니다.', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ message: '게시글 생성 중 오류가 발생했습니다.', error });
    }
  });

  //스터디룸 게시물
  router.get('/:roomId/posts/:postId', async (req, res) => {
    try {
        const { roomId, postId } = req.params;
        const post = await StudyPost.findOne({ _id: postId, studyRoom: roomId })
            .populate('author', 'username')
            .populate('comments.author', 'username');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post', error });
    }
});

// 스터디룸 댓글 생성
router.post('/:roomId/posts/:postId/comments', authMiddleware, async (req, res) => {
    try {
        const { roomId, postId } = req.params;
        const { content } = req.body;
        const user = await User.findOne({ username: req.user.username });

        const post = await StudyPost.findOne({ _id: postId, studyRoom: roomId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            content,
            author: user.id,
        };

        post.comments.push(comment);
        await post.save();

        res.status(201).json({ message: 'Comment added', comment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Error adding comment', error });
    }
});

router.delete('/:roomId/posts/:postId/comments/:commentId', authMiddleware, async (req, res) => {
    try {
        const { roomId, postId, commentId } = req.params;
        const user = await User.findOne({ username: req.user.username });


        const post = await StudyPost.findOne({ _id: postId, studyRoom: roomId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        comment.remove();
        await post.save();

        res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Error deleting comment', error });
    }
});




module.exports = router;
