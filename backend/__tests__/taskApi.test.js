const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const SECRET = process.env.SECRET;
const MONGO_URI = process.env.MONGO_URI;


describe('Task API Integration', () => {
  let token;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(MONGO_URI);
    await User.deleteMany({});
    await Task.deleteMany({});
    
    const user = await User.signup('test@example.com', '@TestPassword123*');
    userId = user._id;
    token = jwt.sign({id: userId}, SECRET, {expiresIn: '1h'});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Test Task',
          description: 'Test Description',
          priority: 'high',
          dueDate: new Date(),
          completed: false
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('title', 'Test Task');
    });
  });

  describe('GET /api/tasks', () => {
    it('should get all tasks for a user', async () => {
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete a task', async () => {

      const createRes = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Task To Delete',
            description: 'This Task Should Be Deleted',
            priority: 'high',
            dueDate: new Date(),
            completed: false
          });

      const taskId = createRes.body._id;

      const deleteRes = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(deleteRes.statusCode).toBe(200);
    });
  });

  describe('PATCH /api/tasks/:id', () => {
    it('should update a task', async () => {
      // First, create a task
      const createRes = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Task To Update',
            description: 'This Task Should Be Updated',
            priority: 'high',
            dueDate: new Date(),
            completed: false
          });

      const taskId = createRes.body._id;

      // Now, update the task
      const updateRes = await request(app)
        .patch(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'Updated Task Title',
            description: 'Updated Task Description',
            priority: 'high',
            dueDate: new Date(),
            completed: false
          });

      expect(updateRes.statusCode).toBe(200);
      expect(updateRes.body).toHaveProperty('title', 'Updated Task Title');
    });
  });
});