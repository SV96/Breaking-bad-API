const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT; 
const router = require('./controllers')
require("./db-driver")

app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});