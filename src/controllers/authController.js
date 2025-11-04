import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Gera token JWT
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

/**
 * POST /api/auth/register
 * Registra um novo usuário
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validações
    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Campos obrigatórios',
        message: 'Nome, e-mail e senha são obrigatórios',
      });
    }

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        error: 'E-mail já cadastrado',
        message: 'Este e-mail já está em uso',
      });
    }

    // Criar usuário
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // Gerar token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Erro de validação',
        message: error.message,
      });
    }

    res.status(500).json({
      error: 'Erro ao criar usuário',
      message: error.message,
    });
  }
};

/**
 * POST /api/auth/login
 * Autentica um usuário
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
      return res.status(400).json({
        error: 'Campos obrigatórios',
        message: 'E-mail e senha são obrigatórios',
      });
    }

    // Buscar usuário (com senha)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
        message: 'E-mail ou senha incorretos',
      });
    }

    // Verificar senha
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Credenciais inválidas',
        message: 'E-mail ou senha incorretos',
      });
    }

    // Gerar token
    const token = generateToken(user._id);

    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao fazer login',
      message: error.message,
    });
  }
};

