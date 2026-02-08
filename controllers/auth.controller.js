const catchAsync = require('../errors/catchAsync');
const User = require('../models/user.model');

const signup = catchAsync(async (req, res) => {
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
});

module.exports = { signup };
