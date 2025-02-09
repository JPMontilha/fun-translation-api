import express from 'express';
import { createComment, getComments } from '../controllers/commentCtrl.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/add', authMiddleware, createComment);
router.get('/comments', getComments);

export default router;