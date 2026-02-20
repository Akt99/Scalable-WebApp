const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500
    },
    status: {
      type: String,
      enum: ['todo', 'in_progress', 'done'],
      default: 'todo',
      index: true
    },
    dueDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

taskSchema.index({ userId: 1, title: 'text', description: 'text' });

module.exports = mongoose.model('Task', taskSchema);
