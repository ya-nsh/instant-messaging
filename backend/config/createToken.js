const jwt = require('jsonwebtoken');

const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '10d'
  });
};

module.exports = createToken;
