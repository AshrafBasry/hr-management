const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const EmployeeController = require('../controllers/employee.controller');
const ErrorHandler = require('../middleware/error.middleware');
const AuthGuard = require('../middleware/auth.middleware');

// auth routes
router.post('/register', ErrorHandler(AuthController.register));
router.post('/login', ErrorHandler(AuthController.login));
router.get('/logout', AuthGuard, ErrorHandler(AuthController.logout));

// employee routes
router.post('/employee', AuthGuard, ErrorHandler(EmployeeController.createEmployee));
router.get('/employees', AuthGuard, ErrorHandler(EmployeeController.getEmployees));
router.get('/employee/:id', AuthGuard, ErrorHandler(EmployeeController.getEmployeeWithId));
router.put('/employee/:id', AuthGuard, ErrorHandler(EmployeeController.updateEmployee));

router.all('*',  (req, res) => res.status(400).json({ message: 'Bad Request.'}))

module.exports = router;