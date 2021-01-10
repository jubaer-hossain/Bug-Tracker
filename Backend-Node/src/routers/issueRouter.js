import express from 'express';
import {
  createIssue, getIssues, getIssuesByAssignee
} from '../controllers/issueController';

const router = express.Router();

router.post('/issues/:uid/:pid', createIssue);
router.get('/issues/:pid', getIssues);
router.get('/issuesbyassignee/:uid', getIssuesByAssignee);
export default router;
