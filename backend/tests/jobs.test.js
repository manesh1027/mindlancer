const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const Job = require('../models/Job');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let mongoServer;
let authToken;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Create a test user and get auth token
    const user = await User.create({
        email: 'client@example.com',
        password: 'password123',
        role: 'client'
    });
    authToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Job.deleteMany({});
});

describe('Jobs Endpoints', () => {
    describe('POST /api/jobs', () => {
        it('should create a new job', async () => {
            const res = await request(app)
                .post('/api/jobs')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    title: 'Test Job',
                    description: 'Test Description',
                    budgetMin: 1000,
                    budgetMax: 2000
                });
            
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('title', 'Test Job');
        });
    });

    describe('GET /api/jobs', () => {
        beforeEach(async () => {
            await Job.create({
                title: 'Test Job',
                description: 'Test Description',
                budgetMin: 1000,
                budgetMax: 2000
            });
        });

        it('should return all jobs', async () => {
            const res = await request(app)
                .get('/api/jobs')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBe(1);
        });
    });
});
