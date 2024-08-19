const express = require('express');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET; 

// Register a new doctor
router.post('/register', async (req, res) => {
    const { name, email, password, specialty } = req.body;
    try {
        const newDoctor = new Doctor({ name, email, password, specialty });
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering doctor', error });
    }
});

// Login a doctor
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor || !(await doctor.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // process.env.JWT_SECRET
        const token = jwt.sign({ id: doctor._id, type: "doctor" }, jwtSecret, { expiresIn: '1h' });
        res.json({ token , type: "doctor" });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
});

// Profile route (requires authentication)
router.get('/profile', verifyToken,  async (req, res) => {

    try {
        
        const doctor = await Doctor.findById(req.user.id).select('-password');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching profile', error });
    }
});

// Profile route (requires authentication)
router.get('/', verifyToken,  async (req, res) => {

    try {
        const doctors = await Doctor.find();
        if (!doctors) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctors);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching profile', error });
    }
});

module.exports = router;
