import express from 'express';
import multer from 'multer';

import { createAlbum, getAlbums, updateAlbum, deleteAlbum } from '../controllers/admin/albums.controller.js';
import { addPictureOfTheMoment, getHomepage, removePictureOfTheMoment } from '../controllers/admin/homepage.controller.js';
import { getPictures, createPicture, updatePicture } from '../controllers/admin/pictures.controller.js';

const router = express.Router();
const upload = multer();

// Homepage
router.get('/homepage', getHomepage);
router.put('/homepage/pictures-of-the-moment/:pictureId', addPictureOfTheMoment);
router.delete('/homepage/pictures-of-the-moment/:pictureId', removePictureOfTheMoment);

// Albums
router.get('/albums', getAlbums);
router.post('/albums', createAlbum);
router.put('/albums/:albumId', updateAlbum);
router.delete('/:albumId', deleteAlbum)

// Pictures
router.get('/albums/:albumId/pictures', getPictures)
router.post('/albums/:albumId/pictures', upload.single('file'), createPicture)
router.put('/albums/:albumId/pictures/:pictureId', updatePicture);

export default router;