// authMiddleware.js
const { body, validationResult } = require('express-validator');

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

module.exports = { registerValidation, loginValidation, validate };
