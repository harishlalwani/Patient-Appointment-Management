const express = require('express');
const Appointment = require('../models/Appointment');
const Slot = require('../models/Slot');
const User = require('../models/User');
const router = express.Router();
const { verifyToken } = require('../middleware/auth'); // Middleware to verify JWT

// Get user's appointments
router.get('/', verifyToken, async (req, res) => {
    try {
        // Fetch all appointments for the logged-in user
        const appointments = await Appointment.find({ user: req.user.id });
        res.json(appointments);
    } catch (error) {
        // Return a server error response if something goes wrong
        res.status(500).json({ message: 'Server error' });
    }
});

// Schedule a new appointment
router.post('/schedule', verifyToken, async (req, res) => {
    const { doctorId, slotId } = req.body;
    try {
        // Create a new appointment with the provided details
        const appointment = new Appointment({
            user: req.user.id,
            slotId,
            doctorId
        });
        // Save the new appointment to the database
        await appointment.save();
        // Return the newly created appointment as a response
        res.status(201).json(appointment);
    } catch (error) {
        // Return an error response if something goes wrong
        res.status(400).json({ message: 'Error scheduling appointment', error });
    }
});

// Cancel an appointment
router.delete('/cancel/:id', verifyToken, async (req, res) => {
    try {
        // Find the appointment by its ID
        const appointment = await Appointment.findById(req.params.id);
        // Check if the appointment exists and if the user is authorized to cancel it
        if (!appointment || !(appointment.doctorId.toString() == req.user.id || appointment.user.toString() == req.user.id)) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        // Set the appointment status to 'Cancelled'
        appointment.status = 'Cancelled';
        // Save the updated appointment
        await appointment.save();
        // Return a success message
        res.json({ message: 'Appointment cancelled' });
    } catch (error) {
        // Return an error response if something goes wrong
        res.status(400).json({ message: 'Error cancelling appointment', error });
    }
});

// Reschedule an appointment
router.post('/reschedule/:id', verifyToken, async (req, res) => {
    try {
        const { doctorId, slotId, start, end, allDay, user } = req.body;
        // Find an existing slot with the provided start and end times
        let newSlot = await Slot.findOne({ start: start, end: end });
        // If no slot exists, create a new one
        if (!newSlot) {
            newSlot = new Slot({
                doctor: doctorId,
                title: "Appointment Booked",
                start,
                end,
                allDay
            });
            await newSlot.save();
        }
        
        // Find the appointment by its ID
        const appointment = await Appointment.findById(req.params.id);
        // Check if the appointment exists and if the user is authorized to reschedule it
        if (!appointment || (appointment.doctorId.toString() != req.user.id)) {
            return res.status(404).json({ message: 'Error rescheduling appointment' });
        }
        // Set the current appointment status to 'Cancelled'
        appointment.status = 'Cancelled';
        await appointment.save();
        
        // Create a new appointment with the new slot details
        const newAppointment = new Appointment({
            user: user,
            slotId: newSlot._id,
            doctorId
        });
        await newAppointment.save();

        // Prepare the response with the new slot and appointment details
        let slot = { ...newSlot._doc };
        slot.appointment = { ...newAppointment._doc };
        res.status(201).json(slot);

    } catch (error) {
        console.log(error);
        // Return an error response if something goes wrong
        res.status(400).json({ message: 'Error rescheduling appointment', error });
    }
});

module.exports = router;
