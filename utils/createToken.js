const jwt = require('jsonwebtoken');
const config = require('../config').default;

module.exports = (data, secret = config.jwtSecret) => {
  return jwt.sign(data, secret, {
    expiresIn: config.expiresIn,
  });
};
