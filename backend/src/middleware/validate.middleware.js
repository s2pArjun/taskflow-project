const { sendError } = require('../utils/apiResponse');

// Joi schema validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((d) => d.message.replace(/"/g, "'"));
      return sendError(res, { statusCode: 400, message: messages.join(', ') });
    }
    next();
  };
};

module.exports = { validate };
