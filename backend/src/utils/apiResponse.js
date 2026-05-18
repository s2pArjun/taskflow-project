/**
 * Send a consistent JSON response shape across all endpoints.
 * Shape: { success, message, data, statusCode }
 */
const sendResponse = (res, { statusCode = 200, success = true, message = '', data = null }) => {
  return res.status(statusCode).json({ success, message, data, statusCode });
};

const sendError = (res, { statusCode = 500, message = 'Internal Server Error', data = null }) => {
  return res.status(statusCode).json({ success: false, message, data, statusCode });
};

module.exports = { sendResponse, sendError };
