const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.register = async (req, res) => {
  const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validateEmailRegex.test(req.body.email)) {
    return res.status(400).json({ message: 'Invalid email.' });
  }

  const isEmailExist = await User.findOne({ email: req.body.email });
  if (isEmailExist) {
    return res.status(400).json({ message: 'Email already exists.' });
  }

  if (req.body.password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  }

  const user = await User.create(userData);

  return res.json({
    data: user,
    message: 'Admin registered successfully.'
  });
}
