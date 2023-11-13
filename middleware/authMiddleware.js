// authMiddleware.js
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ code: 401, message: 'Unauthorized: Token is missing.' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ code: 403, message: 'Forbidden: Invalid token.' });
        }

        req.user = user;
        next();
    });
};

const registerValidation = [
    body('name').notEmpty().withMessage('Name cannot be empty.'),
    body('username').notEmpty().withMessage('Username cannot be empty.'),
    body('email')
        .notEmpty().withMessage('Email cannot be empty.')
        .isEmail().withMessage('Invalid email address.'),
    body('password').notEmpty().withMessage('Password cannot be empty.'),
];

const loginValidation = [
    body('usernameOrEmail').notEmpty().withMessage('Username or email cannot be empty.'),
    body('password').notEmpty().withMessage('Password cannot be empty.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ code: 400, message: 'Validation error', errors: errors.array() });
    }

    next();
};

module.exports = { registerValidation, loginValidation, validate, authenticateToken };