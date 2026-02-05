const mongoose = require('mongoose');
const hashPassword = require('../utils/argon2');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Your name is required.'],
      trim: true,
      minlength: [3, 'Your name must be at least 3 characters long.'],
      maxlength: [50, 'Your name cannot exceed 50 characters.'],
    },

    username: {
      type: String,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Please enter your email address.'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address (example: name@email.com).',
      ],
    },

    password: {
      type: String,
      required: [true, 'Please create a password.'],
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (@$!%*?&).',
      ],
    },

    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password.'],
      validate: {
        validator: function (value) {
          return value === this.password;
        },

        message: 'Passwords do not match. Please try again.',
      },
    },
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;

    return ret;
  },
});

// Pre-save middleware: runs before a document is saved to the database
userSchema.pre('save', async function () {
  // Only hash the password if it has been modified (or is new)
  // This prevents re-hashing an already hashed password
  // when updating other fields like name or email
  if (!this.isModified('password')) return;

  this.password = await hashPassword(this.password);
  this.passwordConfirm = undefined;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
