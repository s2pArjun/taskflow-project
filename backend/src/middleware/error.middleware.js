const { sendError } = require('../utils/apiResponse');

// Must have 4 params for Express to treat it as error middleware
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  // Sequelize validation errors
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const messages = err.errors.map((e) => e.message).join(', ');
    return sendError(res, { statusCode: 400, message: messages });
  }

  // JWT errors (just in case they bubble up)
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, { statusCode: 401, message: 'Invalid token.' });
  }

  return sendError(res, {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = { errorHandler };
