import express from 'express';
import { createAlbum, getAlbums, updateAlbum } from '../controllers/albums.controller.js';
import { getPictures, getPicturesAdmin, updatePicture } from '../controllers/pictures.controller.js';

const publicRouter = express.Router();
publicRouter.get('/', getAlbums);
publicRouter.get('/:albumId/pictures', getPictures)

const adminRouter = express.Router();
adminRouter.get('/', getAlbums);
adminRouter.post('/', createAlbum);
adminRouter.put('/:albumId', updateAlbum);
adminRouter.get('/:albumId/pictures', getPicturesAdmin)
adminRouter.put('/:albumId/pictures/:pictureId', updatePicture);

export default { publicRouter, adminRouter };