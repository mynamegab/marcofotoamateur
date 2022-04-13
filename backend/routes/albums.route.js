import express from 'express';
import { createAlbum, getAlbums, updateAlbum } from '../controllers/albums.controller.js';
import { getPictures, updatePicture } from '../controllers/pictures.controller.js';

const publicRouter = express.Router();
publicRouter.get('/', getAlbums);
publicRouter.get('/:albumId/pictures', getPictures)

const adminRouter = express.Router();
adminRouter.post('/', createAlbum);
adminRouter.put('/:albumId', updateAlbum);
adminRouter.put('/:albumId/pictures/:id', updatePicture);

export default { publicRouter, adminRouter };