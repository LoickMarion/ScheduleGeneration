import { Course, Node, Graph } from "./course";
import { fetchDataFromDatabase, closeDatabase } from "./database";

function parseCourseJSONtoArr(jsonData: any[]): string[][] {
  const output: string[][] = [];
  jsonData.forEach((e) => {
    const layer: string[] = [];
    let major: string = e.major; let courseNumber:string = e.courseNumber; let fall:string = e.fall; let spring:string = e.spring; let credits:string = e.credits;
    layer.push(major); layer.push(courseNumber); layer.push(fall); layer.push(spring); layer.push(credits);
    output.push(layer);
  });
  return output
}

function parsePrereqJSONtoArr(jsonData: any[]): string[] {
  const output: any[] = [];
  jsonData.forEach((e) => {
    let prereq = e.prereq;
    output.push(prereq)
  });
  return output
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

async function getCoursesToTake(userInput: string[]) {
  const courseList: string[] = [];
  var coursesToAddFromUser = userInput;
  while (coursesToAddFromUser.length > 0) {
    const course = coursesToAddFromUser[0];
    if (!courseList.includes(course)) {
      courseList.push(course)
      const prereqs = await queryPrereqs(course);
      //handles the or in the SQL database
      prereqs.forEach(prereq => {
        const orClasses = prereq.split('||');
        coursesToAddFromUser.push(orClasses[0])
      });
    }
    coursesToAddFromUser.shift();
  }
    return courseList;
}

async function returnSchedule(input: string[]){

  const classMap = new Map<string,Course>();
  let nodeMap = new Map<string,Node<Course>>();
  const classesToTake = await getCoursesToTake(input);
  const classList: Course[] = [];

  const promises = classesToTake.map(async (classString) => {
    const courseData = (await queryCourse(classString))[0];
    const prereqData = await queryPrereqs(classString);
    const course = new Course(
      courseData[0],
      courseData[1],
      prereqData,
      courseData[2] as unknown as boolean,
      courseData[3] as unknown as boolean,
      courseData[4] as unknown as number
    );
    classList.push(course);
  });

  await Promise.all(promises);
  
  //console.log(classList);

  classList.forEach((Course) => nodeMap.set(Course.getMajor()+Course.getNumber(),new Node(Course,[])));
  const classStringList: string[] = [];
  classList.forEach((Course) => classStringList.push(Course.getMajor()+Course.getNumber()))
  classList.forEach((Course) => classMap.set(Course.getMajor()+Course.getNumber(),Course));

  console.log(classList)
  const a = new Graph<Node<Course>>(nodeMap,classStringList,16)
  const b = a.getNodeMap();
  const c = a.topoSort();
  //console.log(c)
  const d = a.makeSchedule()
  //console.log(b.get("CS240"));
  return d
}
async function testFunc(){
  const test: string[] = ['CS589','CS377'];
  const pleaseowkr = await returnSchedule(test);
  console.log("the schedule is \n")
  console.log(pleaseowkr);
}

testFunc();