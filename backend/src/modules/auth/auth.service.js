const User = require('../../models/user.model');
const { hashPassword, comparePassword } = require('../../utils/hash.utils');
const { signToken } = require('../../utils/jwt.utils');

const register = async ({ name, email, password, role }) => {
  const existing = await User.scope('withPassword').findOne({ where: { email } });
  if (existing) {
    const err = new Error('Email already in use.');
    err.statusCode = 409;
    throw err;
  }

  const password_hash = await hashPassword(password);
  const user = await User.create({ name, email, password_hash, role: role || 'user' });

  const token = signToken({ id: user.id, role: user.role });
  return { user, token };
};

const login = async ({ email, password }) => {
  // Use withPassword scope to get password_hash field
  const user = await User.scope('withPassword').findOne({ where: { email } });
  if (!user) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const isMatch = await comparePassword(password, user.password_hash);
  if (!isMatch) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({ id: user.id, role: user.role });

  // Return user without password_hash
  const { password_hash, ...userSafe } = user.toJSON();
  return { user: userSafe, token };
};

module.exports = { register, login };
