const express = require('express');
const router = express.Router();

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;