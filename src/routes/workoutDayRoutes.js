import express from 'express';
import { getWorkoutDayById, completeWorkoutDay } from '../controllers/workoutDayController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Todas as rotas de workout days requerem autenticação
router.use(authenticate);

router.get('/:workoutId', getWorkoutDayById);
router.patch('/:workoutId/complete', completeWorkoutDay);

export default router;

