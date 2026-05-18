const { sendError } = require('../utils/apiResponse');

// Usage: requireRole('admin') or requireRole('admin', 'moderator')
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return sendError(res, { statusCode: 403, message: 'Forbidden. Insufficient permissions.' });
    }
    next();
  };
};

module.exports = { requireRole };
