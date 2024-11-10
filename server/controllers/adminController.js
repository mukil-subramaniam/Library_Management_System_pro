// controllers/adminController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Hardcoded admin credentials
const hardcodedAdmin = {
  username: 'admin',
  password: 'admin'
};

// Admin login function with hardcoded authentication
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username !== hardcodedAdmin.username) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Since we aren't storing passwords in hashed form (hardcoded), we can check directly
    const isMatch = (password === hardcodedAdmin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate token for admin
    const token = jwt.sign({ username: hardcodedAdmin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { adminLogin };
