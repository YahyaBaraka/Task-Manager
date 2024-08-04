jest.mock('../models/taskModel');
jest.mock('mongoose');

const { getTasks, createTask, deleteTask, updateTask } = require('../controllers/taskController');
const Task = require('../models/taskModel');
const mongoose = require('mongoose');


describe('Task Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    jest.resetAllMocks();
    Task.createTask = jest.fn();
    Task.getTasks = jest.fn();
    Task.deleteTask = jest.fn();
    Task.findOneAndUpdate = jest.fn();
    mongoose.Types.ObjectId.isValid = jest.fn();
    mockReq = {
      user: { _id: 'testUserId' },
      body: {},
      params: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getTasks', () => {
    it('should get all tasks for a user', async () => {
      const mockTasks = [{ title: 'Task 1' }, { title: 'Task 2' }];
      Task.getTasks.mockResolvedValue(mockTasks);

      await getTasks(mockReq, mockRes);

      expect(Task.getTasks).toHaveBeenCalledWith('testUserId');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {


      const dueDate = new Date();
      const newTask = {
        title: 'New Task',
        description: 'Test description',
        dueDate: dueDate.toISOString(),
        priority: 'high',
        completed: false
      };

      mockReq.body = newTask;
      const createdTask = {
        ...newTask,
        _id: 'newTaskId',
        user_id: 'testUserId',
        dueDate: dueDate // MongoDB typically stores dates as Date objects
      };

      Task.createTask.mockResolvedValue(createdTask);

      await createTask(mockReq, mockRes);

      expect(Task.createTask).toHaveBeenCalledWith(
        newTask.title,
        newTask.description,
        newTask.priority,
        newTask.dueDate,
        newTask.completed,
        'testUserId'
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining(newTask));
    });

    it('should return 400 if title is missing', async () => {
      mockReq.body = { description: 'Test description', dueDate: new Date().toISOString() };

      Task.createTask.mockRejectedValue(new Error('Title field must be filled'));

      await createTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Title field must be filled' });
    });

    it('should return 400 if dueDate is missing', async () => {
      mockReq.body = { title: 'Test Task', description: 'Test description' };

      Task.createTask.mockRejectedValue(new Error('Due Date field must be filled'));

      await createTask(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Due Date field must be filled' });
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      mockReq.params.id = 'taskIdToDelete';
      Task.deleteTask.mockResolvedValue({ _id: 'taskIdToDelete' });

      await deleteTask(mockReq, mockRes);

      expect(Task.deleteTask).toHaveBeenCalledWith('taskIdToDelete');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'taskIdToDelete' }));
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const mockId = 'validObjectId'; // You might want to use a real ObjectId here
      mockReq.params = { id: mockId };
      mockReq.body = { title: 'Updated Title' };

      // Mock mongoose.Types.ObjectId.isValid
      mongoose.Types.ObjectId.isValid.mockReturnValue(true);

      // Mock Task.findOneAndUpdate
      Task.findOneAndUpdate = jest.fn().mockResolvedValue({ _id: mockId, title: 'Updated Title' });

      await updateTask(mockReq, mockRes);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(mockId);
      expect(Task.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: mockId },
        { title: 'Updated Title' },
        { new: true, runValidators: true }
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Updated Title' }));
    });

    it('should return 404 for invalid ObjectId', async () => {
      const mockId = 'invalidObjectId';
      mockReq.params = { id: mockId };

      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

      await updateTask(mockReq, mockRes);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(mockId);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'No such task' });
    });

    it('should return 400 if task not found', async () => {
      const mockId = 'validButNonExistentObjectId';
      mockReq.params = { id: mockId };
      mockReq.body = { title: 'Updated Title' };

      mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);
      Task.findOneAndUpdate = jest.fn().mockResolvedValue(null);

      await updateTask(mockReq, mockRes);

      expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(mockId);
      expect(Task.findOneAndUpdate).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'No such task' });
    });
  });
});