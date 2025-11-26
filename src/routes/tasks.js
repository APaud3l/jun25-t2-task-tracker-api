const express = require('express');

const Task = require('./models/Task');

const router = express.Router();

const auth = require('../middlewares/auth');

router.use(auth);

router.post('/', async (request, response) => {
    try{
        const { title, status, dueDate } = request.body;

        // Build new Task object
        const task = new Task({
            title,
            status,
            dueDate,
            user: request.user.userId // Link the task to the current user
        });

        // Save the task
        await task.save();

    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
});