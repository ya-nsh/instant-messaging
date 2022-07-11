const express = require('express');
const {
  registerUser,
  authUser,
  allUsers
} = require('../controllers/userControllers');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers); // protect is a middleware that checks if the user is logged in
router.post('/login', authUser);

module.exports = router;
