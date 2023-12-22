const sqlite3 = require('sqlite3').verbose();

// Open a connection to the SQLite database
const db = new sqlite3.Database('courseDatabase.db');

// Function to retrieve data from the database
function fetchDataFromDatabase(query) {
  return new Promise((resolve, reject) => {
    //const query = 'SELECT * FROM course_table';
    
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      resolve(rows);
    });
  });
}

// Close the database connection
function closeDatabase() {
  db.close();
}

module.exports = {
  fetchDataFromDatabase,
  closeDatabase,
};

test = fetchDataFromDatabase('SELECT * FROM course_table;');
var a=0;
test.then(result=> {a +=1});
console.log(a);