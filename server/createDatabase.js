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

// Insert sample data
const insertStatement = coursesDB.prepare(`
  INSERT INTO course_table (major, courseNumber, fall,spring,credits) VALUES (?, ?, ?, ?, ?)
`);

// Sample data
/*const sampleData = [
    ['CS', 311, true, true, 4],
    ['CS', 110, true, true, 4],
    ['CS', 160, true, true, 4],
    ['MATH', 233, true, true, 4],
    ['MATH', 235, true, true, 3],
    ['CS', 220, true, true, 4],
    ['CS', 198, true, true, 1],
    ['CS', 210, true, true, 4],
    ['MATH', 131, true, true, 4],
    ['MATH', 132, true, true, 4],
    ['CS', 360, true, true, 3],
    ['CS', 383, true, true, 3],
    ['CS', 230, true, true, 4],
    ['CS', 240, true, true, 4],
    ['CS', 250, true, true, 4],
    ['CS', 589, true, true, 4],
    ['GEN-ED', 1, true, true, 4],
    ['GEN-ED', 2, true, true, 4],
    ['GEN-ED', 3, true, true, 4],
    ['GEN-ED', 4, true, true, 4],
    ['GEN-ED', 5, true, true, 4],
    ['GEN-ED', 6, true, true, 4],
    ['GEN-ED', 7, true, true, 4],
    ['GEN-ED', 8, true, true, 4]
  ];*/

sampleData.forEach(data => insertStatement.run(...data));

// Finalize the insert statement
insertStatement.finalize();

// Close the database connection
coursesDB.close();

