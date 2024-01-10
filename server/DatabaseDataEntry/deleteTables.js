const sqlite3 = require('sqlite3').verbose();
const coursesDB = new sqlite3.Database('./courseDatabase.db');

coursesDB.run('DROP TABLE IF EXISTS prereq_table;');
coursesDB.run('DROP TABLE IF EXISTS course_table;');
coursesDB.run('DROP TABLE IF EXISTS major_req_table;');
coursesDB.run('DROP TABLE IF EXISTS courses_per_req;');