import express from 'express';
import { getWorkoutDayById, completeWorkoutDay } from '../controllers/workoutDayController.js';

const router = express.Router();

router.get('/:workoutId', getWorkoutDayById);
router.patch('/:workoutId/complete', completeWorkoutDay);

export default router;

