
// const mongoose = require('mongoose');
const app = require('./index');

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});