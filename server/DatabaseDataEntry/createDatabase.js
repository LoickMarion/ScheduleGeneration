// createDatabase.js
const sqlite3 = require('sqlite3').verbose();
const coursesDB = new sqlite3.Database('courseDatabase.db');

// coursesDB.run('DROP TABLE IF EXISTS prereq_table;');
// coursesDB.run('DROP TABLE IF EXISTS course_table;');
// coursesDB.run('DROP TABLE IF EXISTS major_req_table;');
// coursesDB.run('DROP TABLE IF EXISTS courses_per_req;');
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
    PRIMARY KEY (major, requirement)
  );
`);

coursesDB.run(`
  CREATE TABLE IF NOT EXISTS courses_per_req (
    requirement TEXT,
    course TEXT,
    PRIMARY KEY (requirement, course)
  );
`);


// Insert data in course_table

insertCourseTable = coursesDB.prepare(`
  INSERT OR IGNORE INTO course_table (major, courseNumber, fall,spring,credits) VALUES (?, ?, ?, ?, ?);
`);
// INSERT data into prereq_table
insertPrereqTable = coursesDB.prepare(`
  INSERT OR IGNORE INTO prereq_table (course,prereq) VALUES (?,?);
`)

// Insert data in major_req_table
insertMajorReq = coursesDB.prepare(`
  INSERT OR IGNORE INTO major_req_table (major, requirement,numOfRequirements) VALUES (?, ?, ?);
`);
// INSERT data into courses_per_req
insertCoursesPerReq = coursesDB.prepare(`
  INSERT OR IGNORE INTO courses_per_req (requirement,course) VALUES (?,?);
`)

function openDatabase() {
  const coursesDB = new sqlite3.Database('courseDatabase.db');
  return coursesDB;
}

// Function to close the database connection
function closeDatabase(db) {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database closed successfully');
    }
  });
}

module.exports = { insertCourseTable, insertPrereqTable, insertMajorReq, insertCoursesPerReq, openDatabase, closeDatabase}





