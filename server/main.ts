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



// async function returnSchedule(input: string[]){

//   const classMap = new Map<string,Course>();
//   let nodeMap = new Map<string,Node<Course>>();
//   const classesToTake = await getCoursesToTake(input,[],[],'');
//   const classList: Course[] = [];

//   const promises = classesToTake.map(async (classString) => {
//     const courseData = (await queryCourse(classString))[0];
//     const prereqData = await queryPrereqs(classString);
//     //changed line below to handle or prereq
//     const test = prereqData.map((e) => e.split('||')[0]);
//     console.log(classString);
//     const course = new Course(
//       courseData[0],
//       courseData[1],
//       test,
//       courseData[2] as unknown as boolean,
//       courseData[3] as unknown as boolean,
//       courseData[4] as unknown as number
//     );
//     console.log(course)
//     classList.push(course);
//   });

//   await Promise.all(promises);
  
//   //console.log(classList);

//   classList.forEach((Course) => nodeMap.set(Course.getMajor()+Course.getNumber(),new Node(Course,[])));
//   const classStringList: string[] = [];
//   classList.forEach((Course) => classStringList.push(Course.getMajor()+Course.getNumber()))
//   classList.forEach((Course) => classMap.set(Course.getMajor()+Course.getNumber(),Course));

//   const a = new Graph<Node<Course>>(nodeMap,classStringList,16)
//   const b = a.getNodeMap();
//   const c = a.topoSort();
//   console.log(c)
//   console.log('Generating Schedule');
//   const d = a.makeSchedule()
//   //console.log(b.get("CS240"));
//   return d
// }

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function testFunc(){
  //const test: string[] = ['CS564','CS563','CS590AB'];
  const test: string[] = ['CS590AB'];
  let list: string[][] = []
  let a = await expandUserInputViaPrereqs([],test,[],list);
  console.log('Waiting for 5 seconds...');
  await wait(3000); // 5000 milliseconds = 5 seconds
  console.log('Finished waiting.');
  let minValue = 1000
  let minList: string[] = []
  let maxValue = 0
  let maxList: string[] = []
  for( let i=0; i<list.length;i++){
    if(minValue > list[i].length){
      minList = list[i]
      minValue = list[i].length;
    }
    else if(maxValue < list[i].length){
      maxList = list[i]
      maxValue = list[i].length;
    }
  }
  console.log('the smallest set of courses has ' + minValue + 'courses.\n' +  minList);
  console.log('the biggest set of courses has ' + maxValue + 'courses.\n' +  maxList);
}

`
//chat gpt's function
async function expandUserInputViaPrereqs(courseList, coursesToAdd, electivesChosen, masterList) {
  while (coursesToAdd.length > 0) {
    const course = coursesToAdd.shift();
    
    if (!courseList.includes(course)) {
      courseList.push(course);
      const prereqs = await queryPrereqs(course);

      const promises = prereqs.map(async (prereq) => {
        const orClasses = prereq.split('||');
        
        if (orClasses.length === 1 && !coursesToAdd.includes(orClasses[0])) {
          coursesToAdd.push(orClasses[0]);
        } else {
          let shouldReturn = false;

          for (let i = 0; i < orClasses.length; i++) {
            if (courseList.includes(orClasses[i]) || coursesToAdd.includes(orClasses[i])) {
              return; // Prerequisite already satisfied
            } else if (electivesChosen.includes(orClasses[i])) {
              coursesToAdd.push(orClasses[i]);
              return; // Elective chosen as a prerequisite
            }
          }

          shouldReturn = true;
          const subPromises = orClasses.map(async (e) => {
            const newCourseList = courseList.slice();
            const newCoursesToAdd = coursesToAdd.slice();
            const newElectives = electivesChosen.slice();
            newCoursesToAdd.push(e);
            newElectives.push(e);

            await expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, newElectives, masterList);
          });

          await Promise.all(subPromises); // Wait for all recursive calls to complete
        }
      });

      await Promise.all(promises); // Wait for all iterations to complete before continuing
    }
  }

  masterList.push(courseList);
}

`
async function expandUserInputViaPrereqs(courseList: string[], coursesToAdd: string[], electivesChosen: string[], masterList: any){
  
  while (coursesToAdd.length > 0) {       //continue until no more courses to take
    
    const course = coursesToAdd.shift() //look at the first course we need to add
    
    //if the course isn't already processed, process it, else remove it from list and continue onto next iteration
    if (!courseList.includes(course!)) {
      let shouldReturn = false;

      //add the course to list courses we have process
      courseList.push(course!)

      //get the prerequisites for a course.
      const prereqs = await queryPrereqs(course!);
     
      //allows so if multiple classes can meet a prereq, every one gets tested.
      console.log(prereqs)
      prereqs.forEach(prereq => {
        //BIG ISSUE> IF OR PREREQ IS FIRST< WONT PROCESS OTHER PREREQS AFTER, MATH 235 GETS IGNORED


        //console.log(prereq);
        //exits forEach if we should return
        // if(shouldReturn){
        //   return;
        // }
        
        const orClasses = prereq.split('||');
        console.log(orClasses)

        if(orClasses.length == 1 && !(coursesToAdd.includes(orClasses[0]))){
          //if there is only one prereq, add it to list of courses we need to take if it isnt there already and carry on as normal.
          console.log(orClasses[0])
          coursesToAdd.push(orClasses[0])
          return;
        }
        else {
          //check if a possible elective is one we have chosen before. If so, choose it again. and we dont need to take any more courses to fulfil this requirement.
          for(let i = 0; i<coursesToAdd.length; i++){
            if(courseList.includes(orClasses[i])||coursesToAdd.includes(orClasses[i])){
              //continue to next iteration of foreach loop as this prereq is already satisfied.
              return;
            }
            //if it is determined that we intend to use a course as a prerequisite but we haven't taken it yet, we add it to our courseList
            else if (electivesChosen.includes(orClasses[i])){
              coursesToAdd.push(orClasses[i]);
              return;
            }
          }   
            shouldReturn = true;
            orClasses.forEach(async(e) => {

              let newCourseList = courseList.slice();
              let newCoursesToAdd = coursesToAdd.slice();
              let newElectives = electivesChosen.slice();
              newCoursesToAdd.push(e)
              newElectives.push(e);
              
              await expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, newElectives, masterList);
            });
          }
      });
      //exits funtion if we should return
      if(shouldReturn){
        return;
      }
    }
    
  }
  //console.log(courseList)
  masterList.push(courseList);
}

async function getCoursesHelper(courseList: string[], coursesToAdd: string[], electivesChosen: string[]){
  
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
  return expandUserInputViaPrereqs(courseList,coursesToAdd, electivesChosen, [])
  
}



testFunc();