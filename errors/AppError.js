class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 400 Bad Request - general client input error
class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400, 'BAD_REQUEST');
  }
}

// 401 Authentication failed - invalid or missing credentials
class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_FAILED');
  }
}

// 403 Forbidden - user lacks permission to access resource
class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

// 404 Not Found - requested resource does not exist
class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

// 409 Conflict - request conflicts with current state of resource
class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409, 'CONFLICT');
  }
}

// 422 Unprocessable Entity - data validation failed
class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 422, 'VALIDATION_ERROR');
  }
}

// 429 Too Many Requests - rate limiting exceeded
class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429, 'TOO_MANY_REQUESTS');
  }
}

// 413 Payload Too Large - request body exceeds allowed size
class PayloadTooLargeError extends AppError {
  constructor(message = 'Payload too large') {
    super(message, 413, 'PAYLOAD_TOO_LARGE');
  }
}

// 5xx Server Errors
// 500 Internal Server Error - generic server-side failure
class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}

// 503 Service Unavailable - server temporarily unable to handle request
class ServiceUnavailableError extends AppError {
  constructor(message = 'Service unavailable') {
    super(message, 503, 'SERVICE_UNAVAILABLE');
  }
}

module.exports = {
  AppError,
  BadRequestError,
  AuthenticationError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  TooManyRequestsError,
  PayloadTooLargeError,
  InternalServerError,
  ServiceUnavailableError,
};
