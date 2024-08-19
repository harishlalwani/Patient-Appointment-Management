const request = require('supertest');
const app = require('../app'); // Adjust the path to your server file
const mongoose = require('mongoose');
const Slot = require('../models/Slot.js'); // Adjust path to your Appointment model

beforeAll(async () => {
    // Connect to the test database before running tests
    await mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    // Close the database connection after tests
    await mongoose.disconnect();
});

let token;

beforeEach(async () => {
    // Log in to get a token before each test
    const response = await request(app)
        .post('/api/doctors/login')
        .send({
            email: 'dr.smith@example.com',
            password: 'doctor123'
        });
    token = response.body.token;
});

describe('Add Slot API', () => {

    describe('POST /api/slots/', () => {
        it('should create a new slot', async () => {
            const eventData = {
                "title":"Available Slot",
                "start":"2024-08-24T01:30:00.000Z",
                "end":1724482800000,
                "allDay":false
            };
            const response = await request(app)
                .post('/api/slots/')
                .set('Authorization', `Bearer ${token}`)
                .send(eventData);
            expect(response.statusCode).toBe(201);
        });
    });

});
