const express = require('express');

const Task = require('../models/Task');

const router = express.Router();

const auth = require('../middlewares/auth');

router.use(auth);

router.post('/', async (request, response) => {
  try {
    const { title, status, dueDate } = request.body;

    // Build new Task object
    const task = new Task({
      title,
      status,
      dueDate,
      user: request.user.userId, // Link the task to the current user
    });

    // Save the task
    // console.log(task);
    // console.log("Is this here or no?");
    await task.save();
    // console.log("Is it here yet?");
    response.status(201).json({
        message: "New Task added.",
        body: task
    });
  } catch (error) {
    response.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
