import { getJSDocReadonlyTag } from "typescript";
import { Course, Node, Graph } from "./course";
import { fetchDataFromDatabase, closeDatabase } from "./database";

function parseCourseJSONtoArr(jsonData: any[]): string[][] {
  const output: string[][] = [];
  jsonData.forEach((e) => {
    const layer: string[] = [];
    let major: string = e.major; let courseNumber: string = e.courseNumber; let fall: string = e.fall; let spring: string = e.spring; let credits: string = e.credits;
    layer.push(major); layer.push(courseNumber); layer.push(fall); layer.push(spring); layer.push(credits);
    output.push(layer);
  });
  return output
}

function parsePrereqJSONtoArr(jsonData: any[]): string[] {
  const output: any[] = [];
  jsonData.forEach((e) => {
    output.push(e.prereq)
  });
  return output
}

function parseMajorReqJSONtoArr(jsonData: any[]): string[] {
  const output: any[] = [];
  jsonData.forEach((e) => {
    for(let i =0; i<e.numOfRequirements; i++){
      output.push(e.requirement)
    }
    
  });
  return output
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

async function getReqsPerCourse(course: string){
  const query = "SELECT * FROM courses_per_req WHERE course = '" + course + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseReqsPerCourseJSONtoArr(courses)
}

async function getCoursesPerReq(requirement: string){
  const query = "SELECT * FROM courses_per_req WHERE requirement = '" + requirement + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseCoursesPerReqJSONtoArr(courses)
}

async function getMajorRequirements(major: string){
  const query = "SELECT * FROM major_req_table WHERE major = '" + major + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseMajorReqJSONtoArr(courses)
}

async function queryPrereqs(course: string) {
  const query = "SELECT * FROM prereq_table WHERE course = '" + course + "';";
  const courses = await fetchDataFromDatabase(query);
  return parsePrereqJSONtoArr(courses)
}

async function queryCourse(course: string) {
  const query = "SELECT * FROM course_table WHERE major || courseNumber = '" + course + "';";
  const courses = await fetchDataFromDatabase(query);
  return parseCourseJSONtoArr(courses)
}


function wait(ms: number): Promise<void> { //Use for test, can delete at end
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function testFunc() {
  const test: string[] = ['CS','MATH'];
  // const majorReqs = await getMajorRequirements('MATH');
  // console.log(majorReqs)
  // const coursesPerReqs = await Promise.all(majorReqs.map(async (e) => await getCoursesPerReq(e)));
  // console.log(coursesPerReqs);
  //let a = await completeSchedule([],test);
  let a = await getReqsPerCourse('CS311');
  console.log(a);
}

async function expandUserInputViaPrereqs(courseList: string[], coursesToAdd: string[], masterList: any) {

  while (coursesToAdd.length > 0) {       //continue until no more courses to take

    
    let course = coursesToAdd.shift() //look at the first course we need to add
    let splitCourse = course!.split('||'); //split the courses so we can check is there is an or
    let shouldBreak = false;
    
    if(splitCourse.length > 1){
      
      if(splitCourse.some((e) => (courseList.includes(e) || coursesToAdd.includes(e)))){
        continue;
      }
      else{
        const promises: Promise<void>[] = [];
        splitCourse.forEach((course) => {
          let newCourseList = courseList.slice();
          let newCoursesToAdd = coursesToAdd.slice();
          newCoursesToAdd.push(course);

          const promise = new Promise<void>((resolve, reject) => {
            expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, masterList)
              .then(() => {
                resolve(); // Resolve the promise when expandUserInputViaPrereqs completes
              })
              .catch((error) => {
                reject(error); // Reject the promise if an error occurs
              });
          });

          promises.push(promise);
        });
        await Promise.all(promises);
        return;
        
      }
    }
    courseList.push(course!)  //add the course to list courses we have process

    const prereqs = await queryPrereqs(course!);     //get the prerequisites for a course.

    prereqs.forEach(prereq => {
      if (!coursesToAdd.includes(prereq) && !courseList.includes(prereq)) {
        coursesToAdd.push(prereq);

      }
    });
  }
  //console.log(courseList)
  masterList.push(courseList);
}

async function completeSchedule(coursesSelected: string[], majors: string[]){
  const majorRequirements = await Promise.all(majors.map(async (e) => await getMajorRequirements(e)));
  const coursesPerReq = await Promise.all(
    majorRequirements.map(async (major) => {
      const courses = await Promise.all(major.map(async (e) => await getCoursesPerReq(e)));
      return courses;
    })
  );
  return coursesPerReq;
}
testFunc();