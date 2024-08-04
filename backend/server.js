const app = require('./app');
const mongoose = require('mongoose');
const { mongoURI, PORT } = require('./env');

mongoose.connect(mongoURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('connected to db & listening on port', PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });