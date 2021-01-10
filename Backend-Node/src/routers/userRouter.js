import express from 'express';
import { getActiveDevelopers, updateUser } from '../controllers/userController';

const router = express.Router();

router.post('/update/:id', updateUser);
router.get('/activedevelopers', getActiveDevelopers)

export default router;
