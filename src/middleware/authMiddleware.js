import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/**
 * Middleware de autenticação
 * Verifica se o usuário está autenticado via JWT
 */
export const authenticate = async (req, res, next) => {
  try {
    // Obter token do header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Token não fornecido',
        message: 'Token de autenticação é obrigatório',
      });
    }

    // Extrair token
    const token = authHeader.substring(7); // Remove "Bearer "

    // Verificar e decodificar token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Buscar usuário no banco
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: 'Token inválido',
        message: 'Usuário não encontrado',
      });
    }

    // Adicionar usuário ao request
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token inválido',
        message: 'Token de autenticação inválido',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado',
        message: 'Token de autenticação expirado. Faça login novamente',
      });
    }

    res.status(500).json({
      error: 'Erro de autenticação',
      message: error.message,
    });
  }
};

