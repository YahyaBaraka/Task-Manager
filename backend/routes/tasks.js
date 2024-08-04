const express = require('express')
const {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// require auth for all task routes
router.use(requireAuth);

// GET all tasks
router.get('/', getTasks);

// POST a new task
router.post('/', createTask);

// DELETE a task
router.delete('/:id', deleteTask);

// UPDATE a task
router.patch('/:id', updateTask);


module.exports = router