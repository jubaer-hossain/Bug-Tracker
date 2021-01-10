import express from 'express';
import authRouter from './authRouter';
import profileRouter from './profileRouter';
import projectRouter from './projectRouter';
import issueRouter from './issueRouter';
import commentRouter from './commentRouter';
import adminRouter from './adminRouter';
import userRouter from './userRouter';

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/auth', authRouter);
router.use('/projects', commentRouter);
router.use('/projects', issueRouter);
router.use('/projects', projectRouter);
router.use('/profile', profileRouter);
router.use('/user', userRouter);


export default router;
