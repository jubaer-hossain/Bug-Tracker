import express from 'express';
import {
  getUserList,
  getProjectList,
} from '../controllers/adminController';

const router = express.Router();

// Email verification
router.get('/users', getUserList);
router.get('/projects', getProjectList);

export default router;
