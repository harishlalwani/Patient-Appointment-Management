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


describe('User API', () => {

    describe('POST /api/auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'password123'
                });
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('User registered successfully');
            
        });
    });

    describe('POST /api/auth/login', () => {
        it('should log in a user', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'john@example.com',
                    password: 'password123'
                });
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});
