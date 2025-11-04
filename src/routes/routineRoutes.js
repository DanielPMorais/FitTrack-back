import express from 'express';
import { getAllRoutines, getRoutineById } from '../controllers/routineController.js';

const router = express.Router();

router.get('/', getAllRoutines);
router.get('/:routineId', getRoutineById);

export default router;

