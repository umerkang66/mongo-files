const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/routes');

// Creating the application
const app = express();
// Express middlewares
// For parsing req.body
app.use(express.json());

routes(app);

// Error Handling middleware should execute after routes
app.use((err, req, res, next) => {
  // If we don't throw error from anywhere from our route handlers, the automatically thrown errors from our routes handlers will be passed through this middleware as err object
  res.status(422).send({ error: err.message });
  next();
});

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect('mongodb://localhost:27017/muber')
    .then(() => console.log('Connected to the DB'));
}

module.exports = app;
