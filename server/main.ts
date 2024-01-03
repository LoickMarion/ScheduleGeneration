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



async function returnSchedule(input: string[]){

  const classMap = new Map<string,Course>();
  let nodeMap = new Map<string,Node<Course>>();
  const classesToTake = await getCoursesToTake(input,[],[],'');
  const classList: Course[] = [];

  const promises = classesToTake.map(async (classString) => {
    const courseData = (await queryCourse(classString))[0];
    const prereqData = await queryPrereqs(classString);
    //changed line below to handle or prereq
    const test = prereqData.map((e) => e.split('||')[0]);
    console.log(classString);
    const course = new Course(
      courseData[0],
      courseData[1],
      test,
      courseData[2] as unknown as boolean,
      courseData[3] as unknown as boolean,
      courseData[4] as unknown as number
    );
    console.log(course)
    classList.push(course);
  });

  await Promise.all(promises);
  
  //console.log(classList);

  classList.forEach((Course) => nodeMap.set(Course.getMajor()+Course.getNumber(),new Node(Course,[])));
  const classStringList: string[] = [];
  classList.forEach((Course) => classStringList.push(Course.getMajor()+Course.getNumber()))
  classList.forEach((Course) => classMap.set(Course.getMajor()+Course.getNumber(),Course));

  const a = new Graph<Node<Course>>(nodeMap,classStringList,16)
  const b = a.getNodeMap();
  const c = a.topoSort();
  console.log(c)
  console.log('Generating Schedule');
  const d = a.makeSchedule()
  //console.log(b.get("CS240"));
  return d
}
async function testFunc(){
  const test: string[] = ['CS574','CS590AE','CS590X'];
  const pleaseowkr = await returnSchedule(test);
  console.log("the schedule is \n")
  console.log(pleaseowkr);
}


//try and save courses by prioritizing ones we know we will take to be smart
  //for example, courses double counted towards multiple majors/minors
  //for example, explicitly required courses
//then try every combination of remaining courses for 'or prereqs' and randomly pick ones for electives and then grade based on criteria


async function getCoursesHelper(courseList: string[], coursesToAdd: string[], electivesChosen: string[]){
  while (coursesToAdd.length > 0) {
    const course = coursesToAdd[0];
    if (!courseList.includes(course)) {
      courseList.push(course)
      const prereqs = await queryPrereqs(course);
      //handles the or in the SQL database
      prereqs.forEach(prereq => {
        const orClasses = prereq.split('||');
        coursesToAdd.push(orClasses[0])
      });
    }
    coursesToAdd.shift();
  }
    return courseList;
}


  //need the data of what to take from each major
  //required [CIC110, CICS 160, CICS210,...,CS311, CICS305]
  //I.E
  //Electives [300+,300+,300+...400+]

  //Add required courses for each major/minor and primary major IE to coursestoTake array?

  //Add prereqs and Electives to an array to be processed

  //process them
  

async function getCoursesToTake(userInput: string[], majorList: string[], minorList: string[], criteria: string) {
  const courseList: string[] = [];
  var coursesToAdd = userInput;
  const electivesChosen = [];
  return getCoursesHelper(courseList,coursesToAdd, electivesChosen)
  
}



testFunc();