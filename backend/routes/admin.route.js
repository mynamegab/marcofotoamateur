import express from 'express';
import multer from 'multer';

import { createAlbum, getAlbums, updateAlbum, deleteAlbum } from '../controllers/admin/albums.controller.js';
import { getPictures, createPicture, updatePicture } from '../controllers/admin/pictures.controller.js';

const router = express.Router();
const upload = multer();

// Albums
router.get('/', getAlbums);
router.post('/', createAlbum);
router.put('/:albumId', updateAlbum);
router.delete('/:albumId', deleteAlbum)

// Pictures
router.get('/:albumId/pictures', getPictures)
router.post('/:albumId/pictures', upload.single('file'), createPicture)
router.put('/:albumId/pictures/:pictureId', updatePicture);

export default router;