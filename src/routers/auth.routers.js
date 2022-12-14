import express from 'express';
import * as authController from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/sign-up', authController.postSignup);
router.post('/sign-in', authController.postSignin);

export default router;