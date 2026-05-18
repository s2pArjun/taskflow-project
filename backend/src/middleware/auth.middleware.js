const { verifyToken } = require('../utils/jwt.utils');
const { sendError } = require('../utils/apiResponse');
const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, { statusCode: 401, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    // Attach full user object to request (excluding password)
    const user = await User.findByPk(decoded.id);
    if (!user) return sendError(res, { statusCode: 401, message: 'User no longer exists.' });
    req.user = user;
    next();
  } catch (err) {
    return sendError(res, { statusCode: 401, message: 'Invalid or expired token.' });
  }
};

module.exports = { authenticate };
