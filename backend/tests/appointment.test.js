const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app'); // Adjust the path to your server file
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment'); // Adjust path to your Appointment model
const Slot = require('../models/Slot');
const jwtSecret = process.env.JWT_SECRET; 


beforeAll(async () => {
    // Connect to the test database before running tests
    await mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Close the database connection after tests
    await mongoose.disconnect();
});

let token;
let user; 
const doctorId = "66c31ecfdf4759f4d43830d1";

beforeEach(async () => {
    // Log in to get a token before each test
    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'john@example.com',
            password: 'password123'
        });
    
    token = response.body.token;
    const decoded = jwt.verify(token, jwtSecret);
    user = decoded;
});

describe('Appointment API', () => {
    let slots = [];
    describe('GET /api/slots/doctor/:doctorId', () => {
        it('should get all appointments for a user', async () => {
            
            const response = await request(app)
                .get('/api/slots/doctor/'+doctorId)
                .set('Authorization', `Bearer ${token}`);
            slots = response.body;
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);

        });
    });

    describe('POST /api/appointments/schedule', () => {
        it('should create a new appointment', async () => {
            const response = await request(app)
                .post('/api/appointments/schedule')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    slotId: slots[0]._id,
                    doctorId: doctorId,
                });
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('status');
        });
    });
});
