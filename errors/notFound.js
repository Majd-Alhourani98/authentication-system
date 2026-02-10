const { NotFoundError } = require('./AppError');

const notFound = (req, res, next) => {
  return next(new NotFoundError(`Can't find ${req.originalUrl} on this server`));
};

module.exports = notFound;
