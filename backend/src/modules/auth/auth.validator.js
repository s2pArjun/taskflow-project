const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),

  // NOTE: role field is intentionally exposed for demo seeding only.
  // In production this field would be removed and admin roles assigned
  // directly in the DB or via a separate protected seed endpoint.
  role: Joi.string().valid('user', 'admin').optional(), // allow seeding admin
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
