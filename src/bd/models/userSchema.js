import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const userSchema = new Schema({
    user: { 
      type: String, 
      required: true,
      unique: true 
    },
    email: { 
      type: String, 
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Por favor, insira um email válido']
    },
    password: { 
      type: String, 
      required: true,
      minlength: 6 
    }
});

const User = mongoose.model('User', userSchema);
export default User;