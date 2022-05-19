import express from 'express';

import { createAlbum, getAlbums, updateAlbum } from '../controllers/admin/albums.controller.js';
import { getPictures, updatePicture } from '../controllers/admin/pictures.controller.js';

const router = express.Router();

// Albums
router.get('/', getAlbums);
router.post('/', createAlbum);
router.put('/:albumId', updateAlbum);

// Pictures
router.get('/:albumId/pictures', getPictures)
router.put('/:albumId/pictures/:pictureId', updatePicture);

export default router;