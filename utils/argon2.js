const argon2 = require('argon2');

// Argon2 Configuration Constants
const HASH_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: Number(process.env.HASH_MEMORY_COST) || 2 ** 16,
  timeCost: Number(process.env.HASH_TIME_COST) || 3,
  parallelism: Number(process.env.HASH_PARALLELISM) || 1,
};

const hashPassword = async password => {
  return await argon2.hash(password, HASH_OPTIONS);
};

module.exports = hashPassword;
