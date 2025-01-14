const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Generate reset password token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // In a real scenario, you would send this token to the user's email
    res.status(200).json({ message: 'Check your email for the reset link', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the reset link.' });
  }
};

module.exports = forgotPassword;
