const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user_id: {
    type: String,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// static Create Task method
taskSchema.statics.createTask = async function (title, description, priority, dueDate, completed, user_id) {

  if (!title)
    throw Error('Title field must be filled');
  if (!dueDate)
    throw Error('Due Date field must be filled');
  if (!user_id)
    throw Error("User can't be specified");

  const taskData = {
    title,
    description,
    priority: priority || 'medium',  // Default priority if not provided
    dueDate: new Date(dueDate),  // Ensure dueDate is a valid Date object
    completed: completed === 'true' ? true : false,
    user_id
  };

  try {
    task = await this.create(taskData);
    return task;
  }
  catch (error) {
    console.error(error);

    throw Error(error);
  }
};

taskSchema.statics.getTasks = async function (user_id) {

  if (!user_id)
    throw Error("User can't be specified");

  try {
    const tasks = await this.find({ user_id }).sort({ createdAt: -1 })
    return tasks;
  }
  catch (error) {
    console.error(error);

    throw Error(error);
  }
};


taskSchema.statics.deleteTask = async function (_id) {

  if (!_id)
    throw Error("User can't be specified");

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: 'no such task' })
  }


  try {
    const task = await this.findOneAndDelete({ _id: _id });

    if (!task) {
      throw Error("No such task exist");
    }

    return task;
  }
  catch (error) {
    console.error(error);
    throw Error(error);
  }
};


module.exports = mongoose.model('Task', taskSchema);