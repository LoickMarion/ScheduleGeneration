// createDatabase.js
const sqlite3 = require('sqlite3').verbose();
const coursesDB = new sqlite3.Database('courseDatabase.db');


// Create a table
coursesDB.run(`
  CREATE TABLE IF NOT EXISTS course_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    major TEXT,
    courseNumber TEXT,
    fall BOOLEAN,
    spring BOOLEAN,
    credits INTEGER
  )
`);

// Insert data
const insertStatement = coursesDB.prepare(`
  INSERT INTO course_table (major, courseNumber, fall,spring,credits) VALUES (?, ?, ?, ?, ?)
`);

// CS Courses
const coreClasses = [
  ['CICS', '110', true, true, 4],
  ['CICS', '160', true, true, 4],
  ['CS', '198C', true, true, 1],
  ['CICS', '210', true, true, 4],
  ['CS', '220', true, true, 4],
  ['CS', '230', true, true, 4],
  ['CS', '240', true, true, 4],
  ['CS', '250', true, true, 4],
  ['CS', '305', true, true, 3],
  ['CS', '311', true, true, 4]
];

const electives300 = [
  ['CS', '320', true, true, 4],
  ['CS', '325', true, true, 3],
  ['CS', '326', true, true, 4],
  ['CS', '345', true, true, 3],
  ['CS', '348', true, true, 3],
  ['CS', '360', true, true, 3],
  ['CS', '370', true, true, 3],
  ['CS', '373', true, true, 3],
  ['CS', '377', true, true, 4],
  ['CS', '383', true, true, 3],
  ['CS', '389', true, true, 3],
  ['CS', '390R', true, true, 3]
];

const electives400 = [
  ['CS', '420', true, true, 3],
  ['CS', '429', true, true, 3],
  ['CS', '445', true, true, 3],
  ['CS', '446', true, true, 3],
  ['CS', '453', true, true, 3],
  ['CS', '466', true, true, 3],
  ['CS', '485', true, true, 3],
  ['CS', '490Q', true, true, 3],
  ['CS', '491G', true, true, 3]
];

const electives500 = [
  ['CS', '501', true, true, 3],
  ['CS', '508', true, true, 3],
  ['CS', '520', true, true, 3],
  ['CS', '528', true, true, 3],
  ['CS', '532', true, true, 3],
  ['CS', '535', true, true, 3],
  ['CS', '546', true, true, 3],
  ['CS', '550', true, true, 3],
  ['CS', '561', true, true, 3],
  ['CS', '564', true, true, 3],
  ['CS', '565', true, true, 3],
  ['CS', '574', true, true, 3],
  ['CS', '589', true, true, 3],
  ['CS', '590AB', true, true, 3],
  ['CS', '590AE', true, true, 3]
];

const nonCS = [
  ['MATH', '131', true, true, 4],
  ['MATH', '132', true, true, 4],
  ['MATH', '233', true, true, 4],
  ['MATH', '235', true, true, 3],
  ['CICS', '256', true, true, 4],
  ['CHEM', '111', true, true, 4],
  ['CHEM', '121', true, true, 4],
  ['CHEM', '112', true, true, 4],
  ['CHEM', '122', true, true, 4],
  ['GEOL', '101', true, true, 4],
  ['GEOL', '103', true, true, 4],
  ['GEOL', '105', true, true, 4],
  ['GEOL', '131', true, true, 4],
  ['PHYSICS', '151', true, true, 4],
  ['PHYSICS', '181', true, true, 4],
  ['PHYSICS', '152', true, true, 4],
  ['PHYSICS', '182', true, true, 4],
  ['ENGLISH', '112', true, true, 3],
  ['GEN-ED','1',true,true,3],
  ['GEN-ED','2',true,true,3],
  ['GEN-ED','3',true,true,3],
  ['GEN-ED','4',true,true,3]
]




coreClasses.forEach(data => insertStatement.run(...data));
electives300.forEach(data => insertStatement.run(...data));
electives400.forEach(data => insertStatement.run(...data));
electives500.forEach(data => insertStatement.run(...data));
nonCS.forEach(data => insertStatement.run(...data));

// Finalize the insert statement
insertStatement.finalize();

// Close the database connection
coursesDB.close();

