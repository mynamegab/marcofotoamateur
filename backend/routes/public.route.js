import express from 'express';

import { getAlbums } from '../controllers/public/albums.controller.js';
import { getPictures } from '../controllers/public/pictures.controller.js';

const router = express.Router();

// Albums
router.get('/', getAlbums);

// Pictures
router.get('/:albumId/pictures', getPictures)

export default router;