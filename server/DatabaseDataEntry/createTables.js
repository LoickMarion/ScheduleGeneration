// createDatabase.js
const sqlite3 = require('sqlite3').verbose();
const coursesDB = new sqlite3.Database('./courseDatabase.db');


//Create a table
coursesDB.run(`
  CREATE TABLE IF NOT EXISTS course_table (
    major TEXT,
    courseNumber TEXT,
    fall BOOLEAN,
    spring BOOLEAN,
    credits INTEGER,
    PRIMARY KEY (major, courseNumber)
  );`
);

coursesDB.run(`
  CREATE TABLE IF NOT EXISTS prereq_table (
    course TEXT,
    prereq TEXT,
    PRIMARY KEY (course, prereq)
  );
`);

coursesDB.run(`
  CREATE TABLE IF NOT EXISTS major_req_table (
    major TEXT,
    requirement TEXT,
    numOfRequirements INTEGER,
    specific BOOLEAN,
    outOfMajor BOOLEAN,
    PRIMARY KEY (major, requirement)
  );
`);

coursesDB.run(`
  CREATE TABLE IF NOT EXISTS courses_per_req (
    major TEXT,
    requirement TEXT,
    course TEXT,
    PRIMARY KEY (requirement, course)
  );
`);


