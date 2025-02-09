import express from 'express';
import { registerUser, loginUser } from '../controllers/authCtrl.js';
import { validateRegister, validateLogin } from '../middlewares/validate.js';

const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;
