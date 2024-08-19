const mongoose = require('mongoose'); // Import the mongoose library

// Define the schema for a 'Slot' document in MongoDB
const slotSchema = new mongoose.Schema({
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, // Reference to a 'Doctor' document
        ref: 'Doctor', // The model to use for population
        required: true // This field is mandatory
    },
    title: { 
        type: String, // Title of the slot
        required: true // This field is mandatory
    },
    start: { 
        type: Date, // Start time of the slot
        required: true // This field is mandatory
    },
    end: { 
        type: Date, // End time of the slot
        required: true // This field is mandatory
    },
    allDay: { 
        type: Boolean, // Indicates if the slot is an all-day event
        default: false // Default value is false
    }
});

// Export the model for use in other parts of the application
module.exports = mongoose.model('Slot', slotSchema);
