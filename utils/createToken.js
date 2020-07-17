const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (data, secret = config.jwtSecret) => {
  return jwt.sign(data, secret, {
    expiresIn: config.expiresIn,
  });
};
