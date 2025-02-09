import express from 'express';
import { createComment, getComments } from '../controllers/commentCtrl.js';

const router = express.Router();

router.post('/add', createComment);
router.get('/comments', getComments);

export default router;