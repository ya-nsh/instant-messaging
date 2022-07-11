const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization && // if the request has an authorization header
    req.headers.authorization.startsWith('Bearer') // if the authorization header starts with Bearer (case insensitive)
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // split the authorization header into an array and get the second element

      //decodes token id and checks if it is valid
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // if the token is valid, it will return a decoded object

      req.user = await User.findById(decoded.id).select('-password'); // set the user to the decoded object's id and select the password field

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
