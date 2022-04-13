import express from 'express';
import { createTag, updateTag } from '../controllers/tags.controller.js';

const adminRouter = express.Router();
adminRouter.post('/', createTag);
adminRouter.put('/:id', updateTag);

export default { adminRouter };