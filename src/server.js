const mongoose = require('mongoose');
const app = require('./index');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

 
const MONGO_URI =
  // eslint-disable-next-line no-undef
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task_scheduler';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Database Connected!');
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB: ', err);
  });
