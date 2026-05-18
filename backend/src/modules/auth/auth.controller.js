const authService = require('./auth.service');
const { sendResponse, sendError } = require('../../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const { user, token } = await authService.register(req.body);
    return sendResponse(res, {
      statusCode: 201,
      message: 'Registration successful.',
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    return sendResponse(res, {
      statusCode: 200,
      message: 'Login successful.',
      data: { user, token },
    });
  } catch (err) {
    next(err);
  }
};

const getMe = (req, res) => {
  return sendResponse(res, {
    statusCode: 200,
    message: 'Profile fetched.',
    data: { user: req.user },
  });
};

module.exports = { register, login, getMe };
