const { customAlphabet } = require('nanoid');

const ALPHANUMERIC_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const DEFAULT_LENGTH = 6;

const generateUsernameSuffix = (length = DEFAULT_LENGTH) => {
  // customAlphabet returns a generator function, which we call immediately with ()
  return customAlphabet(ALPHANUMERIC_CHARSET, length)();
};

console.log(generateUsernameSuffix());
module.exports = { generateUsernameSuffix };
