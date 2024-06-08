import express from 'express';
import { signIn, restricted } from '../controllers/authController.js';

const router = express.Router();

router.post('/signin', signIn);
router.get('/restricted', restricted);

export default router;


