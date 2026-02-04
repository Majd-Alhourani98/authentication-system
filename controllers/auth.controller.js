const User = require('../models/user.model');

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully. Welcome aboard!',
      requestedAt: new Date().toISOString(),
      data: {
        user,
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
