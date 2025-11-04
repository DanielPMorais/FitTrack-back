import express from 'express';
import { getAllRoutines, getRoutineById } from '../controllers/routineController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Todas as rotas de rotinas requerem autenticação
router.use(authenticate);

router.get('/', getAllRoutines);
router.get('/:routineId', getRoutineById);

export default router;

