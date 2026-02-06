const crypto = require('crypto');

const OTP = {
  LENGTH: 6,
  TTL_MS: 15 * 60 * 1000,
};

const hashValue = value => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

const getExpiryDate = ttlMs => {
  return new Date(Date.now() + ttlMs);
};

const generateSecureOTP = (length = OTP.LENGTH, ttlMs = OTP.TTL_MS) => {
  const otp = String(crypto.randomInt(0, 1_000_000));
  const hashedOTP = hashValue(otp);
  const otpExpires = getExpiryDate(ttlMs);
  return { otp, hashedOTP, otpExpires };
};

console.log(generateSecureOTP());
