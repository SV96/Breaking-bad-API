const express = require('express');
const app = express();
const logger = require('./logger')

require('dotenv').config();

const port = process.env.PORT; 
const router = require('./controllers')
require("./db-driver")

app.use(express.json());
app.use(router)

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
});