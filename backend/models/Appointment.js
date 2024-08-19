// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for an appointment
const appointmentSchema = new mongoose.Schema({
    // Reference to the User model, required field
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Reference to the Doctor model, required field
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    // Reference to the Slot model, required field
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
    // Status of the appointment, can be either 'Scheduled' or 'Cancelled', default is 'Scheduled'
    status: { type: String, enum: ['Scheduled', 'Cancelled'], default: 'Scheduled' }
});

// Export the Appointment model based on the appointmentSchema
module.exports = mongoose.model('Appointment', appointmentSchema);
