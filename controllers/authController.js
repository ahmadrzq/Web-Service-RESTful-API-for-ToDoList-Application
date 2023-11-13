// authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Check if the username is already taken
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ code: 400, message: 'Username or email is already taken.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();

        // Respond with user data (excluding the password)
        const userData = {
            name: newUser.name,
            username: newUser.username,
            email: newUser.email,
        };

        res.status(201).json({ code: 201, message: 'User registered successfully.', userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
};

const login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Check if the user exists based on username or email
        const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });

        if (!user) {
            return res.status(401).json({ code: 401, message: 'Invalid username or email.' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ code: 401, message: 'Invalid password.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        // Respond with user data (excluding the password)
        const userData = {
            name: user.name,
            username: user.username,
            email: user.email,
        };

        res.status(200).json({ code: 200, message: 'Login successful.', userData, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: 500, message: 'Internal Server Error' });
    }
};

module.exports = { register, login };
