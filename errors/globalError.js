const { generateErrorId } = require('../utils/nanoid');
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

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    const errorId = generateErrorId();
    console.error('💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 CRITICAL ERROR 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥');
    console.error(`ID:        ${errorId}`);
    console.error(`Time:      ${new Date().toISOString()}`);
    console.error(`Path:      ${req.method} ${req.originalUrl}`);
    console.error(`IP:        ${req.ip}`);
    console.error(`Message:   ${err.message}`);
    console.error(`Stack:     ${err.stack}`);
    console.error(`Error:     ${err}`);
    console.error('💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥');

    // 2) Send professional, clean message to client
    return res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred. Please try again later.',
      supportId: errorId, // Sending it as a separate field is cleaner for frontend handling
    });
  }
};

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(transformError(err), req, res);
  }
};

module.exports = globalError;
