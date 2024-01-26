const express = require('express');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');
var { testFunc } = require("./main");

const app = express();
const port = 5000;

let selectedPrimaryMajor = '';

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const schedule = await testFunc(); // Call testFunc and await its result
    res.setHeader('Content-Type', 'application/json');
    res.send(schedule);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/selected-primary-major', (req, res) => {
  try {
    const { major } = req.body; // Extract the major from the request body
    selectedPrimaryMajor = major
    console.log('Received selected major:', major);
    res.status(200).send('Received selected major successfully');
  } catch (error) {
    console.error('Error handling selected major:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/selected-primary-major', (req, res) => {
  try {

    res.status(200).json({ selectedPrimaryMajor });
  } catch (error) {
    console.error('Error retrieving selected major:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});