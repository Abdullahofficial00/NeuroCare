const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No user found with that email' });
    }

    // Generate a 6-digit random token
    const resetToken = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    
    // Set the reset token and expiry in the user document
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Set expiry for 1 hour from now

    // Save the user document with the reset token and expiry
    await user.save();

    // Create reset password URL
    const resetLink = `${resetToken}`;

    // Configure Nodemailer to send the reset password email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      subject: 'Reset Your Password - Action Required',
  text: `Dear ${user.username || 'User'},

We received a request to reset your password for your account. To proceed, use the verification code provided below:

Your Password Reset Code: ${resetToken}

Please enter this code on the password reset page within the next hour. If you did not request this, please ignore this email—your account remains secure.

At [Your Company Name], we prioritize your security and are here to support you every step of the way. For any assistance, feel free to contact our support team.

Discover More:
✨ Stay updated with the latest features and offers from our platform.
✨ Explore how we are committed to making your experience seamless and secure.

Click here to explore: [Insert Link to Marketing Page]

Warm regards,  
The [Your Company Name] Team  
[Your Company Tagline - e.g., "Secure. Reliable. Yours."]  

---

**Important:**  
For your security, never share this code with anyone. This code will expire in 1 hour.  
`,
};

    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Respond to the client
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending reset link. Please try again.' });
  }
});

module.exports = router;
