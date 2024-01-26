import { get } from "http";
import { Course, Node, Graph } from "./course";
import { getReqsPerCourse, getCoursesPerReq, queryPrereqs, getMajorRequirements, queryCourse, getOutOfMajorReqs, getMajorsPerCourse, queryEntireMajor, getMajorData, returnedData } from "./database";
import * as majorPriorityArrays from "./DatabaseDataEntry/majorPriorityArrays.json";

function wait(ms: number): Promise<void> { //Use for test, can delete at end
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
testFunc()
async function testFunc() {
  const testMajors: string[] = ['CS','MATH'];
  const genEDArr: string[] = ['GENED','GENED2'];
  //const genEDArr: string[] = []

  const finalMajorArr = testMajors.concat(genEDArr)
  const testCourses: string[] = ['CS590AB','CS564']
  const coursesAlreadyTaken: string[] = [];
  const allData = await Promise.all(finalMajorArr.map(async major => await getMajorData(major)))
  const creditLimit = 17;
  let schedule = generateSchedule(coursesAlreadyTaken,testCourses, finalMajorArr,allData,creditLimit);
  console.log(schedule)
  
 
}  

function generateSchedule(coursesTaken: string[],userRequestedCourses: string[], majors: string[], allData: any,creditLimit:number) {
  let masterList: string[][] = [];
  expandUserInputViaPrereqs([], userRequestedCourses, masterList,allData);
  let completedSchedules:string[][][] = []
  let coursesAlreadyTaken = []
  masterList.forEach((list) => {
  const b: string[][] = generateSingleSchedule(coursesAlreadyTaken,list,majors,allData,creditLimit);
  completedSchedules.push(b)})
  completedSchedules.sort((a,b)=> -1000 * (b.length-a.length) - (getTotalCreditNumber(b,allData)-getTotalCreditNumber(a,allData)))

 return completedSchedules[0]

}

function generateSingleSchedule(coursesAlreadyTaken: string[],list: string[], majors: string[], allData:any,creditLimit:number){
 // console.log('iteration')
  // console.log(list)
  let completedSchedule = completeSchedule(coursesAlreadyTaken,list,majors,allData);
  // console.log(completedSchedule)
  let finishedSchedule = scheduleFromCourseList(completedSchedule,allData,creditLimit,coursesAlreadyTaken);
  // console.log(finishedSchedule)
  // console.log(getTotalCreditNumber(finishedSchedule,allData))
  // console.log('\n')

  return finishedSchedule
}

function scheduleFromCourseList(classesInSchedule: string[], allData: any,creditLimit: number, coursesAlreadyTaken: string[]) {
  const classMap = new Map<string, Course>();
  let nodeMap = new Map<string, Node<Course>>();
  const classList: Course[] = [];

  classesInSchedule.forEach((classString) => {
    const course = synchronousGetCourse(classString, allData);
    const courseCopy = course.copy()
    classList.push(courseCopy);
  }); 

  classList.forEach((course) => {
    let prereqs = course.getPrereqs()
    prereqs = prereqs.map((prereq) => {
          let splitPrereq = prereq.split('||');
          if (splitPrereq.length == 1) {
            return splitPrereq[0]
          } else {
            return splitPrereq.find((e) => classesInSchedule.includes(e) || coursesAlreadyTaken.includes(e))!
          }
        }).filter((prereq)=>!coursesAlreadyTaken.includes(prereq))
    
    course.setPrereqs(prereqs)    
  })

  classList.forEach((Course) => nodeMap.set(Course.getMajor() + Course.getNumber(), new Node(Course, [])));
  const classStringList: string[] = [];
  classList.forEach((Course) => classStringList.push(Course.getMajor() + Course.getNumber()))
  classList.forEach((Course) => classMap.set(Course.getMajor() + Course.getNumber(), Course));

  const graph = new Graph<Node<Course>>(nodeMap, classStringList, creditLimit)
  return graph.makeSchedule()
}

function expandUserInputViaPrereqs(courseList: string[], coursesToAdd: string[], masterList: any, allData: any) {

  while (coursesToAdd.length > 0) {  //continue until no more courses to take

    let course = coursesToAdd.shift() //look at the first course we need to add
    let splitCourse = course!.split('||'); //split the courses so we can check is there is an or

    if (splitCourse.length > 1) {

      if (splitCourse.some((e) => (courseList.includes(e) || coursesToAdd.includes(e)))) {
        continue;
      }
      else {
        splitCourse.forEach((course) => {
          let newCourseList = courseList.slice();
          let newCoursesToAdd = coursesToAdd.slice();
          newCoursesToAdd.push(course);
          expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, masterList,allData);         
        });
        return;

      }
    }
    courseList.push(course!)  //add the course to list courses we have process

    const prereqs = synchronousGetPrereqs(course!,allData);     //get the prerequisites for a course.

    prereqs.forEach(prereq => {
      if (!coursesToAdd.includes(prereq) && !courseList.includes(prereq)) {
        coursesToAdd.push(prereq);
      }
    });
  }
  masterList.push(courseList);
}

function completeSchedule(coursesAlreadyTaken:string[],coursesSelectedInput: string[], majors: string[],allData: any) {

  const coursesForSchedule: string[] = [];
  const coursesLeftToAdd = Array.from(new Set(coursesSelectedInput.slice().concat(coursesAlreadyTaken)));
  //array of REQUIRED courses per major
  //const majorRequirements = await Promise.all(majors.map(async (e) => await getMajorRequirements(e)));
  
  //const majorRequirements = majors.map((e) => synchronousGetMajorReqs(e,allData).slice());
  const majorRequirements = majors.map((e) => synchronousGetMajorReqs(e, allData));
  //gets array of courses that can be satisfied by only one course and courses that can be satisfied by multiple courses
  const specific = majorRequirements.map((e) => e[0])
  const general = majorRequirements.map((e) => e[1])

  //map to keep track of which majors we have used a course for to avoid double counting.
  let majorMap = new Map<string, string[]>(); //keep track of which majors a course has been counted for so you dont reuse a course for a specific and electivem e.g. 545 counting for a math elective after being explicitly reuired

  //loops through specific courses and automatically adds them. Adds them to list of courses to process in next step in case they can be electives for other major

  for (const majorIndex in specific) {
    let major = majors[majorIndex];
    specific[majorIndex].forEach(req => {

      let tempArr = majorMap.get(req)
      if (tempArr) {
        tempArr.push(major)
        majorMap.set(req, tempArr)
      }
      else {
        majorMap.set(req, [major])
      }

      if (!coursesForSchedule.includes(req)) {coursesForSchedule.push(req);}
      if (!coursesLeftToAdd.includes(req)) {coursesLeftToAdd.push(req);}
    })
  }

  //processes a list based on classes fro m specifics and classes that we need to take based on user input and eliminates all major requirements it can

  for (const current of coursesLeftToAdd) {
    const requirementsSatisfied = synchronousGetReqsPerCourse(current,allData);

    const filteredReqs = requirementsSatisfied.filter((e) => (general).some((e2) => e2.includes(e)))

     

    //loops through all majors and checks if a course can satisfy something
    for (const majorIndex in general) {
      const major = majors[majorIndex]

      //if course already being used for this major, skip
      if (majorMap.get(current) && majorMap.get(current)!.includes(major)) {
        continue;
      }

    

      const oneMajor = general[majorIndex];
      const bestReq = pickBestReq(oneMajor, filteredReqs, major)
      if (oneMajor.indexOf(bestReq) >= 0) {
        oneMajor.splice(oneMajor.indexOf(bestReq), 1);
        let tempArr = majorMap.get(current)

        if (tempArr) {
          tempArr.push(major)
          majorMap.set(current, tempArr)
        }
        else {
          majorMap.set(current, [major])
        }
      };
    }
    if (!coursesForSchedule.includes(current)) { coursesForSchedule.push(current); }
  }

  const outOfMajorReqs = allData.map((data) => data.outOfMajorReqs.slice())
  const filteredOutOfMajor: string[][] = []
  const filteredGeneral: string[][] = []
  
  for (let i = 0; i < majors.length; i++) {
    filteredOutOfMajor.push([])
    filteredGeneral.push([])
  }

  //sorts remianing requirements based on whether or not it can be satisfied by an out of major course as we need to be smart about which course we pick for those.
  //uses a nested for loop to find each class and then determines if that class is out of major eligible or not. Pushes to corrosponding array
  for (const majorIndex in general) {
    for (const generalClass of general[majorIndex]) {
      outOfMajorReqs[majorIndex].includes(generalClass) ? filteredOutOfMajor[majorIndex].push(generalClass) : filteredGeneral[majorIndex].push(generalClass)
    }
  }


  //while reqs left in filteredOutOfMajor
  //do the wonky array + a bit more to find best class to take
  //remove the reqs it counts for from filteredOutOfMajor
  //add class to schedule
  while (filteredOutOfMajor.some((e) => (e.length > 0))) {
    let bestCourse = pickBestCourse(filteredOutOfMajor, majors, majorMap, coursesForSchedule, allData);
    const requirementsSatisfied = synchronousGetReqsPerCourse(bestCourse!,allData)

    for (const majorIndex in filteredOutOfMajor) {
      const major = majors[majorIndex]
      const oneMajor = filteredOutOfMajor[majorIndex];
      const bestReq = pickBestReq(oneMajor, requirementsSatisfied, major)
      if (oneMajor.indexOf(bestReq) >= 0) {
        oneMajor.splice(oneMajor.indexOf(bestReq), 1);
      };
    }
    coursesForSchedule.push(bestCourse!);
  }

  const restOfClasses = randomClassFilling(filteredGeneral, coursesForSchedule, majors, majorMap,allData);
 
  restOfClasses.forEach(course => coursesForSchedule.push(course))
  const newClasses: string[] = coursesForSchedule.filter((e)=>!coursesAlreadyTaken.includes(e))
  return newClasses;
}

function randomClassFilling(filteredGeneral: string[][], coursesAlreadyTaken: string[], majors: string[], majorMap: Map<string, string[]>,allData: any) {
  const coursesAdded: string[] = [];

    filteredGeneral.map(async (major, acc) => {
      major.map(async (requirement) => {
        const courses = synchronousGetCoursesPerReq(requirement, allData)
        let chosen = false;
        let a: number = Math.floor(Math.random() * courses.length);

        while (!chosen) {
          a = (a + 1) % (courses.length - 1);
          const chosenCourse = courses[a];

          const b = majorMap.get(chosenCourse);
          //const chosenCoursePrereqs = await queryPrereqs(chosenCourse);
          const chosenCoursePrereqs = synchronousGetPrereqs(chosenCourse, allData)
          const prereqsSatisfied = chosenCoursePrereqs.every((e) =>
            e.split('||').some((split) => coursesAlreadyTaken.includes(split))
          );
          const courseAlreadyTaken = coursesAlreadyTaken.includes(chosenCourse) || coursesAdded.includes(chosenCourse);

          if (courseAlreadyTaken || !prereqsSatisfied || (b && b.includes(majors[acc]))) {
            continue;
          } else {
            if(!coursesAdded.includes(chosenCourse)){
              coursesAdded.push(chosenCourse);
              chosen = true;
            } 
          }
        }
      })
  
    acc++;

  })

  return coursesAdded;
}

function pickBestCourse(filteredOutOfMajor: string[][], majors: string[], majorMap: Map<string, string[]>, coursesForSchedule: string[], allData: any) {

  const sortedArr = Array.from(new Set(filteredOutOfMajor.map((major) => major.map((course)=>synchronousGetCoursesPerReq(course,allData))).flat().flat())).sort((a,b)=> synchronousGetMajorsPerCourse(b,allData).length - synchronousGetMajorsPerCourse(a,allData).length )
  for (const possibleCourse of sortedArr) {
    const chosenCoursePrereqs = synchronousGetPrereqs(possibleCourse,allData)
    const prereqsSatisfied = chosenCoursePrereqs.every((e) => e.split('||').some((split) => coursesForSchedule.includes(split)))
    if (!coursesForSchedule.includes(possibleCourse) && !majorMap.get(possibleCourse) && prereqsSatisfied) {
      majorMap.set(possibleCourse, synchronousGetMajorsPerCourse(possibleCourse,allData))
      return possibleCourse;
    }
  }

}

//one major is the requirements remaining for an individual major
//requirements satisfied are the requirements satisfied by a specific course
function pickBestReq(oneMajor: string[], requirementsSatisfied: string[], major: string) {
  const filteredReqs = requirementsSatisfied.filter(e => oneMajor.includes(e))
  const curMajorPriority: string[] = majorPriorityArrays[major]
  for (const priority of curMajorPriority) {
    if (filteredReqs.includes(priority)) { return priority }
  }
  return "None";
}

function getTotalCreditNumber(schedule: string[][],allData:any): number{
  let credits = 0;
  for(const semester of schedule){
    for(const course of semester){
      credits += synchronousGetCourse(course,allData).getCredits();
    }
  }
  return credits;
}

function synchronousGetPrereqs(course: string, allData: any){
  for(const singleMajorData of allData){
    const prereqMap = singleMajorData.prereqMap
    let prereqs = prereqMap.get(course)
    if(prereqs != undefined){return prereqs}
  }
  return [];
}

function synchronousGetMajorReqs(major:string, allData: any){
 
  for(const singleMajorData of allData){
    
    if(major === singleMajorData.major){
      const output:string[][]=[]
      singleMajorData.majorRequirements.forEach(e=>{
        output.push(e.slice())});
      return output
    }
  }
  return []
}

function synchronousGetReqsPerCourse(course: string, allData: any){
  let reqs: string[] = []
  for(const singleMajorData of allData){
    const reqMap = singleMajorData.courseReqMap
    let reqs = reqMap.get(course)
    if(reqs != undefined){return reqs};
  }
  return reqs;
}

function synchronousGetMajorsPerCourse(course: string, allData: any){
   const majors: string[] = []
  for(const data of allData){
    if(data.reqFulfillingCourses.includes(course)){majors.push(data.major)}
  }
  return majors
}

function synchronousGetCoursesPerReq(req: string, allData: any){
  for(const data of allData){
    const courses = data.majorReqMap.get(req)
    if(courses != undefined){return courses}
  }
  return [];
}

function synchronousGetCourse(courseName: string, allData: any){
  for(const data of allData){
    if(data.possibleCoursesMap.get(courseName) != undefined){ return data.possibleCoursesMap.get(courseName)}
  }
}