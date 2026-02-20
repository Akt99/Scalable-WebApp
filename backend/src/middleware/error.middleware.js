const env = require('../config/env');
const logger = require('../utils/logger');
const { sendError } = require('../utils/response');

const notFoundMiddleware = (req, res) => {
  return sendError(res, `Route not found: ${req.originalUrl}`, 404);
};

const errorMiddleware = (error, req, res, next) => {
  logger.error(error.stack || error.message);

  if (res.headersSent) {
    return next(error);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  const details = env.nodeEnv === 'production' ? null : error.details || null;

  return sendError(res, message, statusCode, details);
};

module.exports = {
  notFoundMiddleware,
  errorMiddleware
};
