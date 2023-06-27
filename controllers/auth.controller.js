const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwtUtil = require('../utils/jwt');
const cache = require("../utils/cache");

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

exports.login = async (req, res) => { 
  const user = await User.findOne({ email: req.body.email }); 
  if (user) {
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (isMatched) {
      const token = await jwtUtil.createToken({ _id: user._id });
      return res.json({ user_token: token });
    }
  }

  return res.status(400).json({ message: 'Your email and/or password are incorrect.' });
}

exports.logout = async (req, res) => {    
  await cache.set(req.token, req.token);  
  return res.json({ message: 'Logged out successfully.' });
}
