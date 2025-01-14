const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['Doctor', 'Patient', 'Admin'], required: true },
  resetToken: { type: String, default: null }, // Store the reset token
  resetTokenExpiry: { type: Date, default: null }, // Token expiry time
});

module.exports = mongoose.model('User', UserSchema);
