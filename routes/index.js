const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');

// auth routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;