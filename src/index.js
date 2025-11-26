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

module.exports = app;
