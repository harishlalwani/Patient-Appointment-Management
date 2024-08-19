const express = require('express'); // Importing express module
const User = require('../models/User'); // Importing User model
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken module
const router = express.Router(); // Creating a new router object
const jwtSecret = process.env.JWT_SECRET; 
// Register user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body; // Destructuring name, email, and password from request body
    try {
        const user = new User({ name, email, password }); // Creating a new User instance
        await user.save(); // Saving the user to the database
        res.status(201).json({ message: 'User registered successfully' }); // Sending success response
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error }); // Sending error response
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body; // Destructuring email and password from request body
    try {
        const user = await User.findOne({ email }); // Finding user by email
        if (!user || !(await user.matchPassword(password))) { // Checking if user exists and password matches
            return res.status(401).json({ message: 'Invalid credentials' }); // Sending invalid credentials response
        }

        const token = jwt.sign({ id: user._id, type: "user" }, jwtSecret, {
            expiresIn: '1h',
        }); // Creating a JWT token
        res.json({ token, type: "user" }); // Sending token in response
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error }); // Sending error response
    }
});

// Protected route example
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extracting token from authorization header
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' }); // Sending no token response
    }

    try {
        const decoded = jwt.verify(token, jwtSecret); // Verifying token
        const user = await User.findById(decoded.id).select('-password'); // Finding user by decoded id and excluding password
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Sending user not found response
        }
        res.json(user); // Sending user data in response
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', error }); // Sending invalid token response
    }
});

module.exports = router; // Exporting the router
