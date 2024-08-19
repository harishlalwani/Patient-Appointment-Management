const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Slot = require('../models/Slot');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/authDoctor');
const jwtSecret = process.env.JWT_SECRET; 

// Add a new slot
router.post('/', verifyToken, async (req, res) => {
    const { title, start, end, allDay } = req.body;
    try {
        // Initialize an array to hold the slots
        var slots = [];
        // Loop to create slots for each hour between start and end times
        for (var d = new Date(start); d <= new Date(end); d.setHours(d.getHours() + 1)) {
            let _start = (new Date(d));
            let _end = (new Date(d));
            _end = _end.setHours(_end.getHours() + 1);
            _end = (new Date(_end));
            // Push the slot to the slots array
            slots.push({ 
                doctor: req.doctor.id,
                title, 
                start: _start, 
                end: _end, 
                allDay 
            });
        }
        
        // Insert all slots into the database
        await Slot.insertMany(slots);
        // Respond with the created slots
        res.status(201).json(slots);
    } catch (error) {
        console.error('Error adding slot:', error);
        // Respond with an error if slot creation fails
        res.status(500).json({ error: 'Failed to add slot' });
    }
});

// Get all slots for the authenticated doctor
router.get('/', verifyToken, async (req, res) => {
    try {
        // Extract the token from the authorization header
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);

        // Find slots for the authenticated doctor
        const slots = await Slot.find({"doctor": decoded.id});

        // Respond with the found slots
        res.status(200).json(slots);
    } catch (error) {
        console.error('Error fetching slots:', error);
        // Respond with an error if fetching slots fails
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
});

// Get slots for a specific doctor by doctorId
router.get('/doctor/:doctorId', async (req, res) => {
    const { doctorId } = req.params;

    try {
        // Aggregate slots with their appointments for a specific doctor
        const slotsWithAppointments = await Slot.aggregate([
            {
                $match: {
                    doctor: new mongoose.Types.ObjectId(doctorId),
                },
            },
            {
                $lookup: {
                    from: 'appointments', // The name of the Appointment collection
                    localField: '_id',    // Slot _id
                    foreignField: 'slotId', // Appointment field that references Slot
                    as: 'appointments',  // Name of the field for joined data
                    pipeline: [{"$match": {"status": "Scheduled"}}], // Only include scheduled appointments
                },
            },
            {
                $set: {
                    appointment: { $first: "$appointments" }, // Set the first appointment as a field
                },
            },
            {
                $unset: ["appointments"] // Remove the appointments array
            }
        ]);

        // Respond with the slots and their appointments
        res.status(200).json(slotsWithAppointments);
    } catch (error) {
        console.error('Error fetching slots:', error);
        // Respond with an error if fetching slots fails
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
});

module.exports = router;
