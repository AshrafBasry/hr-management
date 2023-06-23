const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const ErrorHandler = require('../middleware/error.middleware');

// auth routes
router.post('/register', ErrorHandler(AuthController.register));
router.post('/login', ErrorHandler(AuthController.login));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;