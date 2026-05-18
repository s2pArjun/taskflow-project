const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  return bcrypt.hash(password, 12);
};

const comparePassword = async (plain, hashed) => {
  return bcrypt.compare(plain, hashed);
};

module.exports = { hashPassword, comparePassword };
