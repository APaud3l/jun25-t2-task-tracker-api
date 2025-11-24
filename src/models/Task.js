const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxLength: 200,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
            // Only validate if a date is provided
            if (!value) return true;

            // Check if value is in the future date (or today)
            return value >= new Date();
        },
        message: 'Due date must be in the future'
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', TaskSchema);