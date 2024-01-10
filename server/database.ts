//import {sqlite3} from 'sqlite3';
const sqlite3 = require('sqlite3');
// Open a connection to the SQLite database
const db = new sqlite3.Database('./DatabaseDataEntry/courseDatabase.db');

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

function parseCourseJSONtoArr(jsonData: any[]): string[] {
  const layer: string[] = [];
  jsonData.forEach((e) => {
    let major: string = e.major; let courseNumber: string = e.courseNumber; let fall: string = e.fall; let spring: string = e.spring; let credits: string = e.credits;
    layer.push(major); layer.push(courseNumber); layer.push(fall); layer.push(spring); layer.push(credits);
  });
  return layer
}

function parsePrereqJSONtoArr(jsonData: any[]): string[] {
  const output: any[] = [];
  jsonData.forEach((e) => {
    output.push(e.prereq)
  });
  return output
}

function parseMajorReqJSONtoArr(jsonData: any[]): string[][] {
  const specific: any[] = [];
  const general: any[] = [];
  jsonData.forEach((e) => {
    for(let i =0; i<e.numOfRequirements; i++){
      e.specific ? specific.push(e.requirement) : general.push(e.requirement);
    }
  });
  return [specific,general];
}

function parseCoursesPerReqJSONtoArr(jsonData: any[]): string[] {
  const output: any[] = []
  jsonData.forEach((e) => {
    output.push(e.course)
  })
  return output;
}
function parseReqsPerCourseJSONtoArr(jsonData: any[]):string[]{
  const output: any[] = []
  jsonData.forEach((e) => {
    output.push(e.requirement)
  })
  return output;
}

function parseGetMajorsPerCourse(jsonData: any[]): string[]{
  const output: any[] = []
  jsonData.forEach((e) => {
    if(!output.includes(e.major)){    output.push(e.major)    }
  })
  return output
}

export async function getMajorsPerCourse(course: string){
  const query = "SELECT major FROM courses_per_req WHERE course = '" + course + "';";
  const majors = await fetchDataFromDatabase(query);
  return parseGetMajorsPerCourse(majors)
}
export async function getOutOfMajorRecs(major: string){
  const query = "SELECT * FROM major_req_table WHERE major = '" + major + "' AND outOfMajor = true;";
  const courses = await fetchDataFromDatabase(query);
  return parseMajorReqJSONtoArr(courses)
}

export async function getReqsPerCourse(course: string){
  const query = "SELECT * FROM courses_per_req WHERE course = '" + course + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseReqsPerCourseJSONtoArr(courses)
}

export async function getCoursesPerReq(requirement: string){
  const query = "SELECT * FROM courses_per_req WHERE requirement = '" + requirement + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseCoursesPerReqJSONtoArr(courses)
}

export async function getMajorRequirements(major: string){
  const query = "SELECT * FROM major_req_table WHERE major = '" + major + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseMajorReqJSONtoArr(courses)
}

export async function queryPrereqs(course: string) {
  const query = "SELECT * FROM prereq_table WHERE course = '" + course + "';";
  const courses = await fetchDataFromDatabase(query);
  return parsePrereqJSONtoArr(courses)
}

export async function queryCourse(course: string) {
  const query = "SELECT * FROM course_table WHERE major || courseNumber = '" + course + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseCourseJSONtoArr(courses)
}