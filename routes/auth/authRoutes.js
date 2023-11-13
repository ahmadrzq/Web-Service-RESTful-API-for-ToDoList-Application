// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const authMiddleware = require('../../middleware/authMiddleware');

// Register a new user
router.post('/register', authMiddleware.registerValidation, authMiddleware.validate, authController.register);

// Login
router.post('/login', authMiddleware.loginValidation, authMiddleware.validate, authController.login);

module.exports = router;
