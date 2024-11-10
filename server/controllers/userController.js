const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// User Signup Function
const signupUser = async (req, res) => {
  const { username, email, name, password, phone } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      name,
      password: hashedPassword,
      phone,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login Function
const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signupUser,
  userLogin,
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        res.status(200).json(users); // Send all users as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Controller to fetch the total count of users
const getUserCount = async (req, res) => {
    try {
        const count = await User.countDocuments(); // Get the total user count
        res.status(200).json({ totalUsers: count }); // Send the count as JSON
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user count' });
    }
};

module.exports = {
    signupUser,
    userLogin,
    getAllUsers,
    getUserCount,
};