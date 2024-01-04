//import {sqlite3} from 'sqlite3';
const sqlite3 = require('sqlite3');
// Open a connection to the SQLite database
const db = new sqlite3.Database('courseDatabase.db');

// Function to retrieve data from the database
export function fetchDataFromDatabase(query: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
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
export function closeDatabase(): void {
  db.close();
}