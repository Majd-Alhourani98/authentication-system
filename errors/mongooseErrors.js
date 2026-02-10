const { BadRequestError, ConflictError, ValidationError } = require('./AppError');

const handleCastErrorDB = err => {
  return new BadRequestError(`Invalid ${err.path}: ${err.value}.`);
};

const handleDuplicateFieldsDB = err => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];

  return new ConflictError(`Duplicate field: ${field}: "${value}". Please use another value.`);
};

const handleValidationErrorDB = err => {
  // Extract all the error messages from the 'errors' object
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new ValidationError(message);
  //   return new AppError(err.message, 400);
};

module.exports = { handleCastErrorDB, handleDuplicateFieldsDB, handleValidationErrorDB };
