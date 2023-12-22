import * as fs from "fs";
import { Course, Node, Graph } from "./course";
import { fetchDataFromDatabase, closeDatabase } from "./database";



//Demonstration of usage

/*
User: I want to figure out what classes I need to take as a CS Major!
System: Sure, let me figure out what classes a CS Major needs to take.
        *Fetch CS Major requirements, store them*
System: Now that I have the CS Major classes, can you tell me what courses you have already taken?
User: Sure! *inputs courses already taken*
System: Thanks! *Puts those into courseMap*. Now, are there any specific electives you want to take at
        any point on your college career, such as CS589? If not, they will be generated randomly.
User: Actually yes, I do want to take that course!
System: Nice! Here, let me add that to your elective list! Any others?
User: Nope, just that one!
System: Awesome! *Generates a CS Schedule, with 589 included* Here is your schedule!
User: Thanks! BTW I'm zuckerberg and want to buy this from you fro $82 billion!!!!!
*/


//589? Prereq = 389. <---- add this to target course list
//389? Prereq = 240.
//240? Prereq = 210.



//get majors to take from website
//get list of courses to take from majors
    //get list of major requriements from database?
    //get list of courses that could satisfy from database?
//turn that list into a schedule
function parseCourseJSONtoArr(jsonData: any[]){
  const output: any[] = [];
  jsonData.forEach((e) => {
    let major = e.major; let courseNumber = e.courseNumber; let fall = e.fall; let spring = e.spring; let credits = e.credits;
    output.push([major,courseNumber,fall,spring,credits])
  });
  return output
}

function parsePrereqJSONtoArr(jsonData: any[]){
  const output: any[] = [];
  jsonData.forEach((e) => {
    let prereq = e.prereq;
    output.push(prereq)
  });
  return output
}
function queryPrereqs(course: string){
  const query = 'SELECT * FROM prereq_table WHERE course = '+ course +';';
  const courses = await fetchDataFromDatabase(query);
  return parseCourseJSONtoArr(courses)
}

function getCoursesToTake(userInput: string[], majors: string[]){
  const courseList: string[] = []; 
  var coursesToAddFromUser = userInput;
  while(coursesToAddFromUser.length >0){
    const course = coursesToAddFromUser[0];
    if(!courseList.includes(course)){
      courseList.push(course)
      const prereqs = queryPrereqs(course)
      prereqs.forEach(prereq => coursesToAddFromUser.push(prereq))
    }
    coursesToAddFromUser.shift();
  }

  const coursesForMajor = 
}


function data_to_course_map_parser(data: String){
  const courseList: Course[] = [];
  const textByLine = data.split("\n");

  for(let i = 0; i < textByLine.length; i++){
    let [major,number,prereq_string,fall,spring,credits] = textByLine[i].split(',');
    //major, num, etc = get next course from closeDatabase
    // prereqs = searchPrereqTable(course,number)

    //let prereqs = prereq_string.split('&&')
    let prereqs = prereq_string === undefined || prereq_string === '' ? [] : prereq_string.split('&&')
    const input = new Course(major,Number(number),prereqs, stringToBool(fall), stringToBool(spring),Number(credits));

    courseList.push(input)
  }
  return courseList
}


function stringToBool(s: string): boolean{
  return (s === "T");
}




function returnSchedule(){
  const filePath = './CS_Classes.txt';

  const data = readFileSync(filePath);
  const classList = data ? data_to_course_map_parser(data): [];
  const classMap = new Map<string,Course>();
  let nodeMap = new Map<string,Node<Course>>();
  classList.forEach((Course) => nodeMap.set(Course.getMajor()+Course.getNumber(),new Node(Course,[])));
  const classStringList: string[] = [];
  classList.forEach((Course) => classStringList.push(Course.getMajor()+Course.getNumber()))
  //classList.forEach((Course) => classMap.set(Course.getMajor()+Course.getNumber(),Course));
  
  
  const a = new Graph<Node<Course>>(nodeMap,classStringList,16)
  const b = a.getNodeMap();
  const c = a.topoSort();
  console.log(c)
  const d = a.makeSchedule()
  //console.log(b.get("CS240"));
  return d
}