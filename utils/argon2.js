const argon2 = require('argon2');

const hashPassword = async password => {
  return await argon2.hash(password, {
    type: argon2.argon2id, // Hybrid mode: protects against both side-channel and GPU attacks
    memoryCost: 2 ** 16, // 64MB - adjusts memory usage
    timeCost: 3, // Number of iterations
    parallelism: 1, // Number of threads to use
  });
};

module.exports = hashPassword;
