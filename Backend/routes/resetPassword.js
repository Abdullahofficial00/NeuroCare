const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); // Load environment variables

// Reset Password Route
router.post('/', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Validate input
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }

    // Decode and verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Log decoded token for debugging
    } catch (err) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Find the user with the decoded token
    const user = await User.findOne({
      _id: decoded.userId,
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Check if the reset token is not expired
    });

    if (!user) {
      console.log('User not found or token expired'); // Debug log
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    console.log('User Found:', user); // Log user for debugging

    // Compare the reset token from request with the token stored in the database
    if (user.resetToken !== token) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the password and clear the reset token and expiry
    user.password = hashedPassword;
    user.resetToken = undefined; // Clear the reset token
    user.resetTokenExpiry = undefined; // Clear the expiry time
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
