const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      // regex way of validating email format
      // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
      validate: {
        validator: validator.isEmail,
        message: 'Please use a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  // Only hash if password is new or changed
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', UserSchema);
