const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Security Middlewares
const helmet = require('helmet');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5000', 'https://deployedFrontend.com'],
  optionsSuccessStatus: 200,
};

app.use(helmet());
app.use(cors(corsOptions));

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/v1/auth', authRoutes);

const taskRoutes = require('./routes/tasks');
app.use('/api/v1/tasks', taskRoutes);

app.get('/', (request, response) => {
  response.json({
    message: 'Hello from Task Tracker!',
  });
});

app.get('/databaseHealth', (request, response) => {
  response.json({
    models:mongoose.connection.modelNames(),
    host: mongoose.connection.host
  });
});

// If a route/path is requested, something that doesn't exist, run this:
app.all(/.*/, (request, response) => {
    response.status(404).json({
        message: "No route with that path found!",
        attemptedPath: request.path
    });
});

// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  // Extract status from error, default to 500
  const status = error.status || 500;
  
  // Log server-side errors for debugging (only for dev mode)
  if (status === 500) {
    console.error(error.stack || error);
  }

  //  Send JSON error with message
  response
  .status(status)
  .json({
    error: error.message || 'Internal Server Error',
    name: error.name
  });
});

module.exports = app;
