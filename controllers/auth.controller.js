const User = require('../models/user.model');

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = new User({ name, email, password, passwordConfirm });

    const otp = user.generateEmailVerificationOTP();

    await user.save();

    res.status(201).json({
      status: 'success',
      message: 'User created successfully. Welcome aboard!',
      requestedAt: new Date().toISOString(),
      data: { user },
      otp: otp,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { signup };
