const crypto = require('crypto');

const hashValue = value => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

const getExpiryDate = ttlMs => {
  return new Date(Date.now() + ttlMs);
};

const generateSecureOTP = () => {
  let otp = '';

  for (let i = 0; i < 6; i++) {
    otp += crypto.randomInt(0, 10);
  }

  const hashedOTP = hashValue(otp);
  const otpExpires = getExpiryDate(15 * 60 * 1000);
  return { otp, hashedOTP, otpExpires };
};

console.log(generateSecureOTP());
