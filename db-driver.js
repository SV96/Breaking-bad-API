const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://thevipinmishra:l37hi0XHrP7swyli@cluster0.l6ur14n.mongodb.net/Breaking-bad');

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
