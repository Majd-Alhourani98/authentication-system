const User = require('../models/user.model');

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

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
