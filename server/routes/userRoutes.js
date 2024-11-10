const express = require('express');
const { signupUser, userLogin, getAllUsers, getUserCount } = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/signup', signupUser);

// Login route
router.post('/login', userLogin);

// Route to fetch all users
router.get('/users', getAllUsers);

// Route to fetch the total count of users
router.get('/users/count', getUserCount);

module.exports = router;
