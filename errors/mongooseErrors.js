const AppError = require('./AppError');

const handleCastErrorDB = err => {
  return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
};

const handleDuplicateFieldsDB = err => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  return new AppError(`Duplicate field: ${field}: "${value}". Please use another value.`, 400);
};

const handleValidationErrorDB = err => {
  // Extract all the error messages from the 'errors' object
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
  //   return new AppError(err.message, 400);
};

module.exports = { handleCastErrorDB, handleDuplicateFieldsDB, handleValidationErrorDB };
