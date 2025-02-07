import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './connection.js';
import User from './models/userSchema.js';
import Comment from './models/commentSchema.js';

dotenv.config();

const testConnection = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Test User Creation
    const testUser = new User({
      user: 'testuser',
      email: 'test@example.com',
      password: 'testpassword123'
    });

    const savedUser = await testUser.save();
    console.log('User created successfully:', savedUser);

    // Test Comment Creation
    const testComment = new Comment({
      user: savedUser._id,
      title: 'Test Comment',
      description: 'This is a test comment for connection verification'
    });

    const savedComment = await testComment.save();
    console.log('Comment created successfully:', savedComment);

    // Test User Retrieval
    const retrievedUser = await User.findById(savedUser._id);
    console.log('User retrieved:', retrievedUser);

    // Test Comment Retrieval with Population
    const retrievedComment = await Comment.findById(savedComment._id).populate('user');
    console.log('Comment with user details:', retrievedComment);

    // Cleanup
    await User.findByIdAndDelete(savedUser._id);
    await Comment.findByIdAndDelete(savedComment._id);
    console.log('Test data cleaned up');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await mongoose.connection.close();
  }
};

testConnection();