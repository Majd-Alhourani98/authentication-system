const { handleCastErrorDB, handleDuplicateFieldsDB, handleValidationErrorDB } = require('./mongooseErrors');

const transformError = err => {
  let error = { ...err };
  error.messge = err.message;
  error.name = err.name;
  error.code = err.code;

  if (error.name === 'CastError') {
    error = handleCastErrorDB(error);
  } else if (error.code === 11000) {
    error = handleDuplicateFieldsDB(error);
  } else if (error.name === 'ValidationError') {
    error = handleValidationErrorDB(error);
  }

  return error;
};

module.exports = transformError;
