import express from 'express';
import {
  createProject,
  getActiveProject,
  getEachManagerProjects,
  getSingleProject,
  updateProject,
} from '../controllers/projectController';

const router = express.Router();

router.get('/activeprojects', getActiveProject)
router.post('/:uid', createProject);
router.get('/:uid', getEachManagerProjects);
router.get('/details/:id', getSingleProject);
router.post('/update/:id', updateProject);

export default router;
