const express = require('express');
const routes = require('./routes/routes');

// Creating the application
const app = express();
// Express middlewares
// For parsing req.body
app.use(express.json());

routes(app);

module.exports = app;
