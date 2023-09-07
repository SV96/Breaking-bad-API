const express = require('express');
const app = express();
const port = 3859; 
const router = require('./controllers')
require("./db-driver")

app.use(express.json());
app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});