import express from 'express';
import { handleLoginFormSubmit, handleRestrictedLinkClick, handleWelcomePage } from '../controllers/authController.js';

const router = express.Router();

router.post('/signin', handleLoginFormSubmit);
router.get('/restricted', handleRestrictedLinkClick);
router.get('/welcome', handleWelcomePage);

export default router;