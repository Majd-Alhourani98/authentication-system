const User = require('../models/user.model');
const { generateSecureOTP } = require('../utils/crypto');

const signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const { otp, hashedOTP, otpExpires } = generateSecureOTP();

    const user = await User.create({
      name,
      email,
      password,
      passwordConfirm,
      emailVerificationOTP: hashedOTP,
      emailVerificationOTPExpiresAt: otpExpires,
    });

    res.status(201).json({
      status: 'success',
      message: 'User created successfully. Welcome aboard!',
      requestedAt: new Date().toISOString(),
      data: { user },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

module.exports = { signup };
