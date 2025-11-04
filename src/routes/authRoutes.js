import express from 'express';
import { register, login, updateProfile, updatePassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas (requerem autenticação)
router.patch('/profile', authenticate, updateProfile);
router.patch('/password', authenticate, updatePassword);

export default router;

