const { sendErrorDev, sendErrorProd } = require('./sendErrorResponse');
const transformError = require('./transformError');

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
