const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`${process.env.DATABASE}/Breaking-bad`);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
