import express from 'express';
import {
  emailAuthentication,
  emailVerify,
  signInWithEmail,
} from '../controllers/authController';

const router = express.Router();

// Email verification
router.post('/signup', emailAuthentication);
router.post('/email/verify', emailVerify);
router.post('/signin', signInWithEmail);

export default router;
