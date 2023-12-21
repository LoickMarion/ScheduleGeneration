const express = require('express');
const cors = require('cors'); // Import the cors middleware
var returnSchedule = require("./main");

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes

app.get('/', (req, res) => {
    const schedule = returnSchedule()
  res.send(schedule);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});