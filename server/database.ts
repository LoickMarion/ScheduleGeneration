import { Course } from "./course";

//import {sqlite3} from 'sqlite3';
const sqlite3 = require('sqlite3');
// Open a connection to the SQLite database'
const db = new sqlite3.Database('./DatabaseDataEntry/courseDatabase.db');

export type returnedData = {
  majorRequirements: string[][]
  majorReqMap: Map<string,string[]>
  possibleCoursesMap: Map<string,Course>
  prereqMap: Map<string, string[]>
}

export async function getMajorData(major : string){
  //list of major requirements
  let majorRequirements = await getMajorRequirements(major)
  
  //map of each major requirement to coruses it fulfills
  const majorReqMap : Map<string,string[]> = new Map()
  await Promise.all(majorRequirements.map(async (e) => await Promise.all(e.map(async (f) => majorReqMap.set(f, await getCoursesPerReq(f))))))
  //map of each course to the major requirement it fulfills

  const courseReqMap : Map<string,string[]> = new Map();

  const reqFulfillingCourses = Array.from(new Set((await Promise.all(majorRequirements.map(async (e) => await Promise.all(e.map(async (f) => await getCoursesPerReq(f)))))).flat().flat().flat()))
  await Promise.all(reqFulfillingCourses.map(async (course) => courseReqMap.set(course,await getReqsPerCourse(course))))



  //list of all courses with data
  const totalCourses = await getPrereqs(reqFulfillingCourses)

  const possibleCoursesMap: Map<string,Course> = new Map()
  await Promise.all(totalCourses.map(async (classString) => { //Idk if we need to assign this to classPromises?
    const courseData = await queryCourse(classString);
    const prereqData = await queryPrereqs(classString);
    const course = new Course(
      courseData[0],
      courseData[1],
      prereqData,
      courseData[2],
      courseData[3],
      courseData[4]
    );
    possibleCoursesMap.set(classString,course)
  }));
  //map of all prereqs
  const prereqMap: Map<string, string[]> = new Map()
  
  await Promise.all(totalCourses.map(async (course) => { 
    prereqMap.set(course, await queryPrereqs(course))
  }))
  console.log(prereqMap)
  let output: returnedData = {majorRequirements, majorReqMap, possibleCoursesMap, prereqMap}
  return output;
}

async function getPrereqs(courses: string[]){
  const newCourses: string[] = []
  const processingCourses = courses.slice()
  await Promise.all(processingCourses.map(async (course) => {
    let prereqs = await queryPrereqs(course)
    await Promise.all(prereqs.map((e) => e.split('||').forEach((f) => {
      if(!processingCourses.includes(f) && !newCourses.includes(f)){ newCourses.push(f) }
    })))
  }))
  if(newCourses.length == 0){ 
    return processingCourses
  } else { 
    newCourses.forEach(e=>processingCourses.push(e)); 
    return getPrereqs(processingCourses);
  }
}


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


function parseEntireMajorJSONtoArr(jsonData: any[]): any[] {
  const output: any[][] = [];
  jsonData.forEach((e) => {
    const layer: any[] = [];
    let major: string = e.major; let courseNumber: string = e.courseNumber; let fall: boolean = e.fall; let spring: boolean = e.spring; let credits: number = e.credits;
    layer.push(major); layer.push(courseNumber); layer.push(fall); layer.push(spring); layer.push(credits);
    output.push(layer)
  });
  return output
}
function parseCourseJSONtoArr(jsonData: any[]): any[] {
  const layer: any[] = [];
  jsonData.forEach((e) => {
    let major: string = e.major; let courseNumber: string = e.courseNumber; let fall: boolean = e.fall; let spring: boolean = e.spring; let credits: number = e.credits;
    layer.push(major); layer.push(courseNumber); layer.push(fall); layer.push(spring); layer.push(credits);
  });
  return layer
}

function parsePrereqJSONtoArr(jsonData: any[]): string[] {
  const output: any[] = [];
  jsonData.forEach((e) => {
    //console.log("Course: " + e.course + " prereq(s): " + e.prereq + "\n")
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
export async function queryEntireMajor(major: string) {
  const query = "SELECT * FROM course_table WHERE major = '" + major + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseEntireMajorJSONtoArr(courses)

}

export async function queryCourse(course: string) {
  const query = "SELECT * FROM course_table WHERE major || courseNumber = '" + course + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseCourseJSONtoArr(courses)
}