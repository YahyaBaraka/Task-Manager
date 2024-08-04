const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get all tasks
const getTasks = async (req, res) => {
  const user_id = req.user._id;


  try {
    const tasks = await Task.getTasks(user_id);
    console.log(tasks);

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
}


// create new task
const createTask = async (req, res) => { // this should be changed but will keep the (functionality)
  const {title, description, priority, dueDate, completed} = req.body

  const user_id = req.user._id;

  // add doc to db
  try {
    console.log(title);
    const task = await Task.createTask(title, description, priority, dueDate, completed, user_id);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({error: error.message});
    console.log(error);
  }
}

// delete a task
const deleteTask = async (req, res) => { // every task should have an id
  const { id } = req.params;

  try {
    const task = await Task.deleteTask(id);
    res.status(200).json(task);
  } catch(error) {
    res.status(400).json({error: error.message});
    console.log(error);
  }
}

// update a task
const updateTask = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such task'})
  }

  const task = await Task.findOneAndUpdate({_id: id}, {
    ...req.body},
    {new: true, runValidators: true}
  );

  if (!task) {
    return res.status(400).json({error: 'No such task'})
  }

  res.status(200).json(task)
}


module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTask
}