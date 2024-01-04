"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.fetchDataFromDatabase = void 0;
//import {sqlite3} from 'sqlite3';
var sqlite3 = require('sqlite3');
// Open a connection to the SQLite database
var db = new sqlite3.Database('./DatabaseDataEntry/courseDatabase.db');
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
