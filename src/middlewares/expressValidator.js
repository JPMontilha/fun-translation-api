import { body, validationResult } from 'express-validator';

// Middleware de validação para registro
export const validateRegister = [
  body('user').isLength({ min: 3 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
  body('email').isEmail().withMessage('Email inválido.'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Middleware de validação para login
export const validateLogin = [
  body('email').notEmpty().withMessage('O email é obrigatório.').isEmail().withMessage('Email inválido.'),
  body('password').notEmpty().withMessage('A senha é obrigatória.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
