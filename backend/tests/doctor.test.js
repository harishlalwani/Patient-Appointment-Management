const request = require('supertest');
const app  = require('../app'); // Adjust the path to your server file
const mongoose = require('mongoose');

beforeAll(async () => {
    // Connect to the test database before running tests
    await mongoose.connect('mongodb://localhost:27017/testDB', {useNewUrlParser: true,
    useUnifiedTopology: true});
});

afterAll(async () => {
    // Close the database connection after tests
    await mongoose.disconnect();
});

describe('Doctor API', () => {

    describe('POST /api/doctors/register', () => {
        it('should register a new doctor', async () => {
            const response = await request(app)
                .post('/api/doctors/register')
                .send({
                    name: 'Dr. Smith',
                    email: 'dr.smith@example.com',
                    password: 'doctor123'
                });
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Doctor registered successfully');
        });
    });

    describe('POST /api/doctors/login', () => {
        it('should log in a doctor', async () => {
            const response = await request(app)
                .post('/api/doctors/login')
                .send({
                    email: 'dr.smith@example.com',
                    password: 'doctor123'
                });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});
