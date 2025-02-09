import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './bd/connection.js';
import authRoutes from './bd/routes/authRoutes.js';
import commentRoutes from './bd/routes/commentRoutes.js';
import rateLimit from 'express-rate-limit';

dotenv.config();
connectDB();

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 5, // Limita a 5 tentativas por IP
    message: 'Muitas tentativas de login. Tente novamente depois de 5 minutos.',
  });

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', limiter, authRoutes);
app.use('/comment', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
