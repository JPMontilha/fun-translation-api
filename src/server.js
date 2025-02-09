import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './bd/connection.js';
import authRoutes from './bd/routes/authRoutes.js';
import commentRoutes from './bd/routes/commentRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/comment', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
