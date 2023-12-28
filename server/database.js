"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.fetchDataFromDatabase = void 0;
var sqlite3_1 = require("sqlite3");
// Open a connection to the SQLite database
var db = new sqlite3_1.default.Database('courseDatabase.db');
// Function to retrieve data from the database
function fetchDataFromDatabase(query) {
    return new Promise(function (resolve, reject) {
        db.all(query, [], function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}
exports.fetchDataFromDatabase = fetchDataFromDatabase;
// Close the database connection
function closeDatabase() {
    db.close();
}
exports.closeDatabase = closeDatabase;
