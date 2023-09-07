const mongoose = require('mongoose');
const logger = require('./logger')
require('dotenv').config();

mongoose.connect(`${process.env.DATABASE}/Breaking-bad`);

mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  logger.error('Error connecting to MongoDB:', err)
});
