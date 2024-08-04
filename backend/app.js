require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/tasks');

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

module.exports = app;