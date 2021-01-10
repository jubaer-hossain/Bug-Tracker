import express from 'express';
import {
  createComment,
} from '../controllers/commentController';

const router = express.Router();

router.post('/issues/comments/:uid/:issueid', createComment);

export default router;
