const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; 

// Endpoint to fetch messages for a specific chat (based on chatId)
router.get('/:receiverId', async (req, res) => {
    try {
        // Extract the token from the Authorization header
        const token = req.headers.authorization?.split(' ')[1];

        // If no token is provided, return a 401 Unauthorized response
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify the token and decode the payload
        const decoded = jwt.verify(token, jwtSecret);

        // Extract the user ID from the decoded token
        const userId = decoded.id;
        // Extract the receiverId from the request parameters
        const { receiverId } = req.params;

        // Query the database to find messages between the user and the receiver
        const messages = await Message.find(
            { 
                $or: [
                    {
                        $and: [
                            {senderId: userId},
                            {receiverId: receiverId}
                        ]
                    },
                    {
                        $and: [
                            {senderId: receiverId},
                            {receiverId: userId}
                        ]
                    },
                ], 
            }
        ).sort({ createdAt: 1 }); // Fetch messages in chronological order

        // Return the messages as a JSON response
        res.json(messages);
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response
        console.log('messages', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
