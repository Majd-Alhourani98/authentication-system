const User = require('../models/user.model');

const sanitizeUser = user => {
  const sanitized = user._doc;

  delete sanitized.password;

  return sanitized;
};

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    const cleanUser = sanitizeUser(user);

    res.status(201).json({
      status: 'success',
      message: 'User created successfully. Welcome aboard!',
      requestedAt: new Date().toISOString(),
      data: {
        user: cleanUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { signup };
