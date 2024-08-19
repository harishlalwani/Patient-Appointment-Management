// Import the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for the Message collection
const messageSchema = new mongoose.Schema({
    senderId: { type: String, required: true, ref: 'User' }, // Can be a user or a doctor
    // The ID of the sender, which references a user or a doctor
    senderId: { type: String, required: true, ref: 'User' },
    // The ID of the receiver, which references a user
    receiverId: { type: String, required: true, ref: 'User' },
    // The content of the message
    content: { type: String, required: true },
    // The timestamp when the message was created, defaults to the current date and time
    timestamp: { type: Date, default: Date.now },
});

// Export the Message model based on the messageSchema
module.exports = mongoose.model('Message', messageSchema);
