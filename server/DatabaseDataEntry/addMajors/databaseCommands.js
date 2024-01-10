const sqlite3 = require('sqlite3').verbose();
const coursesDB = new sqlite3.Database('../courseDatabase.db');


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
  INSERT OR IGNORE INTO major_req_table (major, requirement,numOfRequirements, specific, outOfMajor) VALUES (?, ?, ?, ?, ?);
`);
// INSERT data into courses_per_req
insertCoursesPerReq = coursesDB.prepare(`
  INSERT OR IGNORE INTO courses_per_req (major,requirement,course) VALUES (?,?,?);
`)

function openDatabase() {
  const coursesDB = new sqlite3.Database('../courseDatabase.db');
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





