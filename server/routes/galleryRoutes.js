const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const GalleryFolder = require('../models/GalleryFolder');
const authMiddleware = require('../middleware/authMiddleware');

// Multer 설정 (사진 업로드를 위한 미들웨어)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/photos'); // 사진 저장 경로
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 모든 갤러리 폴더 가져오기
router.get('/', async (req, res) => {
    try {
      const folders = await GalleryFolder.find({}, '_id title');
      res.json(folders);
    } catch (error) {
      console.error('Error fetching folders:', error);
      res.status(500).json({ message: 'Error fetching folders', error });
    }
  });
  

// 새 갤러리 생성
router.post('/', upload.array('images', 10), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Uploaded Files:', req.files);
        const { title } = req.body;
  
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
  
      const images = req.files ? req.files.map((file) => file.path) : [];
  
      const newFolder = new GalleryFolder({
        title,
        images, // 이미지 경로 배열 저장
    });
  
      await newFolder.save();
      res.status(201).json(newFolder);
    } catch (error) {
      console.error('Error creating folder:', error);
      res.status(500).json({ message: 'Error creating folder', error });
    }
  });
  

// 특정 갤러리의 사진 목록 가져오기
router.get('/:id', async (req, res) => {
    const folderId = req.params.id;
    console.log('Folder ID:', folderId); // 전달된 ID 확인

    if (!folderId) {
        return res.status(400).json({ message: 'Folder ID is required' });
    }

    try {
      const folderId = req.params.id;

      const folder = await GalleryFolder.findById(folderId);
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
  
      res.status(200).json(folder);
    } catch (error) {
      console.error('Error fetching folder:', error);
      res.status(500).json({ message: 'Error fetching folder', error });
    }
  });
  
  //갤러리 사진 삭제
  router.delete('/:id/delete-photo', authMiddleware, async (req, res) => {
    try {
        const { id: folderId } = req.params;
        const { imageUrl } = req.body;

        console.log('folderId:', folderId);
        console.log('imageUrl:', imageUrl);

        const folder = await GalleryFolder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ message: '폴더를 찾을 수 없습니다.' });
        }

        folder.images = folder.images.filter((img) => img !== imageUrl);
        await folder.save();

        const fs = require('fs');
        const filePath = `uploads/photos/${imageUrl.split('/').pop()}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        res.status(200).json(folder);
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ message: '이미지 삭제 중 오류가 발생했습니다.', error });
    }
});
  

// 특정 갤러리에 사진 업로드
router.post('/:id/add-photo', upload.single('photo'), async (req, res) => {
    const { id: folderId } = req.params; 
  
    if (!req.file) {
      return res.status(400).json({ message: '사진이 필요합니다.' });
    }
  
    const newPhotoUrl = `uploads/photos/${req.file.filename}`;
  
    try {
      const updatedFolder = await GalleryFolder.findByIdAndUpdate(
        folderId,
        { $push: { images: newPhotoUrl } },
        { new: true } 
      );
  
      if (!updatedFolder) {
        return res.status(404).json({ message: '폴더를 찾을 수 없습니다.' });
      }
  
      res.status(201).json(updatedFolder);
    } catch (error) {
      console.error('Error updating folder:', error);
      res.status(500).json({ message: '폴더 업데이트 중 에러가 발생했습니다.', error });
    }
  });
  

module.exports = router;
