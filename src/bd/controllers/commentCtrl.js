import Comment from '../models/commentSchema.js';

export const createComment = async (req, res) => {
  try {
    const { user, title, description } = req.body;

    const newComment = new Comment({
      user,
      title,
      description,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'user email');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('user', 'user email');

    if (!comment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    if (!deletedComment) {
      return res.status(404).json({ message: 'Comentário não encontrado' });
    }

    res.status(200).json({ message: 'Comentário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByUser = async (req, res) => {
  try {
    const comments = await Comment.find({ user: req.params.userId }).populate('user', 'user email');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};