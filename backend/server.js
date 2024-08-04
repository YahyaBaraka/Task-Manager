const app = require('./app');
require("dotenv").config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('connected to db & listening on port', PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });