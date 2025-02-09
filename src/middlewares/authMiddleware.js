import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remover "Bearer " do token

  if (!token) return res.status(401).json({ message: 'Acesso negado!' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // O "verified" tem o ID do usuário
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido!' });
  }
};