// Import the necessary modules
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const { verifyToken } = require('../middleware/auth'); // Import the verifyToken middleware
const router = express.Router(); // Create a new router object

// Route to get the list of users (requires authentication)
router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        if (!users) {
            return res.status(404).json({ message: 'Doctor not found' }); // If no users are found, return a 404 error
        }
        res.json(users); // Respond with the list of users in JSON format
    } catch (error) {
        res.status(400).json({ message: 'Error fetching profile', error }); // If an error occurs, return a 400 error with the error message
    }
});

module.exports = router; // Export the router object
