const express = require('express');
const cors = require('cors'); // Import the cors middleware
const bodyParser = require('body-parser');
var { testFunc } = require("./main");

const app = express();
const port = 5001;

let selectedData = {
  primary: null,
  secondary: null,
  tertiary: null,
  minor: null,
  credits: 12,
  takenCourses: [],
  hasGenEds: false
};


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

app.post('/selected-data', (req, res) => {
  try {
    console.log(req.body)
    const { primaryMajor, secondaryMajor, thirdMajor, minor, credits, takenCourses, hasGenEds} = req.body;
    if (primaryMajor !== undefined) {
      selectedData.primary = primaryMajor;
    }
    if (secondaryMajor !== undefined) {
      selectedData.secondary = secondaryMajor;
    }
    if (thirdMajor !== undefined){
      selectedData.tertiary = thirdMajor
    }
    if (minor !== undefined){
      selectedData.minor = minor;
    }
    if (credits !== undefined){
      selectedData.credits = credits;
    }
    if (takenCourses != undefined){
      selectedData.takenCourses = takenCourses;
    }
    if (hasGenEds != undefined){
      selectedData.hasGenEds = hasGenEds
    }
    console.log('Received selected data:', selectedData);
    res.status(200).send('Received selected major successfully');
  } catch (error) {
    console.error('Error handling selected major:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/selected-data', (req, res) => {
  try {

    res.status(200).json({ selectedData });
  } catch (error) {
    console.error('Error retrieving selected major:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/reset-majors', (req, res) => {
  try {
    selectedData = {
      primary: null,
      secondary: null,
      tertiary: null,
      minor: null,
      credits: 12,
      takenCourses: [],
      hasGenEds: false
    };
    console.log('Selected majors reset successfully');
    res.status(200).send('Selected majors reset successfully');
  } catch (error) {
    console.error('Error resetting majors:', error);
    res.status(500).send('Internal Server Error');
  }
});