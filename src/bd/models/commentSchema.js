import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',  // Reference to User model
      required: true 
    },
    title: { 
      type: String, 
      required: true,
      trim: true 
    },
    description: { 
      type: String, 
      required: true,
      minlength: 6 
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;