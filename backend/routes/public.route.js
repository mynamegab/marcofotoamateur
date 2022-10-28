import express from 'express';

import { getAlbums } from '../controllers/public/albums.controller.js';
import { getHomepage } from '../controllers/public/homepage.controller.js';
import { getPictures } from '../controllers/public/pictures.controller.js';

const router = express.Router();

// Homepage
router.get('/homepage', getHomepage);

// Albums
router.get('/albums', getAlbums);

// Pictures
router.get('/albums/:albumId/pictures', getPictures)

export default router;