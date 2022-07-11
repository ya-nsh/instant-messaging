const asyncHandler = require('express-async-handler');
const createToken = require('../config/createToken');
const User = require('../models/userModel');

const allUsers = asyncHandler(async (req, res) => {
  // extracting query params from the request like /api/user?search=john
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } }
        ]
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // exclude the current user from the list of users
  res.send(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Enter all the fields');
  }

  const checkUserExists = await User.findOne({ email });

  if (checkUserExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password, pic });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      //  JWT Token
      token: createToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('User not created due to some error');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Enter all the fields');
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User does not exist');
  }

  if (user && (await user.comparePassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      //  JWT Token
      token: createToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error('Email or password is invalid');
  }
});

module.exports = { registerUser, authUser, allUsers };
