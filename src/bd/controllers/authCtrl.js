import xss from 'xss';
import validator from 'validator';
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Função de validação para senha
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  return regex.test(password); // Retorna true se a senha for válida
};

// Registrar usuário
export const registerUser = async (req, res) => {
  try {
    const { user, email, password } = req.body;

    const sanitizedUser = xss(user);
    const sanitizedPassword = xss(password);

    // Validação básica para garantir que os dados não sejam inválidos
    if (!validator.isLength(sanitizedUser, { min: 3, max: 20 })) {
      return res.status(400).json({ message: 'O usuário deve ter entre 3 e 20 caracteres.' });
    }
    if (!validator.isLength(sanitizedPassword, { min: 8 })) {
      return res.status(400).json({ message: 'A senha deve ter pelo menos 8 caracteres.' });
    }
    if (!validatePassword(sanitizedPassword)) {
      return res.status(400).json({
        message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial.',
      });
    }


    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ $or: [{ email }, { user }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário ou email já existe' });
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizedPassword, salt);

    // Criar novo usuário
    const newUser = new User({
      user: sanitizedUser,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login de usuário
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    // Comparar senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ou senha inválidos' });
    }

    // Gerar Token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user: { id: user._id, user: user.user, email: user.email } });
  } catch (error) {
    // Se a falha foi causada pelo rate-limiter
    if (error.message === 'Too many requests') {
      return res.status(429).json({ message: 'Muitas tentativas de login. Tente novamente depois de alguns minutos.' });
    }

    res.status(500).json({ message: error.message });
  }
};