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
  const testMajors: string[] = ['CS','MATH', 'GENED2'];
  //const genEDArr: string[] = ['GENED','GENED2'];
  const genEDArr: string[] = []

  const finalMajorArr = testMajors.concat(genEDArr)
  const testCourses: string[] = ['CS590AB','CS564']
  const coursesAlreadyTaken: string[] = [];
  const allData = await Promise.all(finalMajorArr.map(async major => await getMajorData(major)))
  let schedule = generateSchedule(coursesAlreadyTaken,testCourses, testMajors,allData);
  
 
}  

async function generateSchedule(coursesTaken: string[],userRequestedCourses: string[], majors: string[], allData: any) {
  let masterList: string[][] = [];
  expandUserInputViaPrereqs([], userRequestedCourses, masterList,allData);
  let b = await completeSchedule(masterList[0],majors,allData)
  console.log(b)
  // masterList = await Promise.all(masterList.map(async (combination) => await completeSchedule(combination, majors)))
  // let schedules = await Promise.all(masterList.map(async (list) => await scheduleFromCourseList(list)))
  // await expandUserInputViaPrereqs([], testCourses, masterList);
  // const schedules: string[][][] = []
  // console.log('first \n')
  // //console.log(masterList);
  // let step1: string[][] = await Promise.all(masterList.map(async list =>  await completeSchedule(list,finalMajorArr)))
  // console.log('second \n')
  // console.log(step1);
  // let step2: string[][][] = await Promise.all(step1.map(async list => await (scheduleFromCourseList(list))))
  // console.log('third \n')
  // console.log(step2);
}

async function scheduleFromCourseList(classesInSchedule: string[]) {

  const classMap = new Map<string, Course>();
  let nodeMap = new Map<string, Node<Course>>();
  const classList: Course[] = [];
  //console.log('hi')
  await Promise.all(classesInSchedule.map(async (classString) => { //Idk if we need to assign this to classPromises?
    const courseData = await queryCourse(classString);
    const prereqData = await queryPrereqs(classString);
    const mappedPrereqs = prereqData.map((prereq) => {
      let splitPrereq = prereq.split('||');
      if (splitPrereq.length == 1) {
        return splitPrereq[0]
      } else {
        return splitPrereq.filter((e) => classesInSchedule.includes(e))[0]
      }
    })
    
    const course = new Course(
      courseData[0],
      courseData[1],
      mappedPrereqs,
      courseData[2],
      courseData[3],
      courseData[4],
    );
    // console.log(classString)
    // console.log(course);
    classList.push(course)
    return course;
  }));
  //console.log(classList)
  classList.forEach((Course) => nodeMap.set(Course.getMajor() + Course.getNumber(), new Node(Course, [])));
  const classStringList: string[] = [];
  classList.forEach((Course) => classStringList.push(Course.getMajor() + Course.getNumber()))
  classList.forEach((Course) => classMap.set(Course.getMajor() + Course.getNumber(), Course));


  const a = new Graph<Node<Course>>(nodeMap, classStringList, 16)
  const c = a.topoSort();
  const d = a.makeSchedule()
  return d
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

async function completeSchedule(coursesSelectedInput: string[], majors: string[],allData: any) {

  const coursesForSchedule: string[] = [];
  const coursesLeftToAdd = coursesSelectedInput.slice();
  //array of REQUIRED courses per major
  //const majorRequirements = await Promise.all(majors.map(async (e) => await getMajorRequirements(e)));
  const majorRequirements = majors.map((e) => synchronousGetMajorReqs(e,allData));

  //gets array of courses that can be satisfied by only one course and courses that can be satisfied by multiple courses
  const specific = majorRequirements.map((e) => e[0])
  const general = majorRequirements.map((e) => e[1])

  //map to keep track of which majors we have used a course for to avoid double counting.
  let majorMap = new Map<string, string[]>(); //keep track of which majors a course has been counted for so you dont reuse a course for a specific and electivem e.g. 545 counting for a math elective after being explicitly reuired

  //loops through specific courses and automatically adds them. Adds them to list of courses to process in next step in case they can be eectives for other major
 
  for (const majorIndex in specific) {
    let major = majors[majorIndex];
    specific[majorIndex].forEach(req => {

      if (!coursesForSchedule.includes(req)) {
        coursesForSchedule.push(req);
        let tempArr = majorMap.get(req)
        if (tempArr) {
          tempArr.push(major)
          majorMap.set(req, tempArr)
        }
        else {
          majorMap.set(req, [major])
        }
      }

      if (!coursesLeftToAdd.includes(req)) {
        coursesLeftToAdd.push(req);
      }
    })
  }

  //processes a list based on classes fro m specifics and classes that we need to take based on user input and eliminates all major requirements it can

  for (const current of coursesLeftToAdd) {
    const requirementsSatisfied = synchronousGetReqsPerCourse(current,allData);
    const filteredReqs = requirementsSatisfied.filter((e) => (general).some((e2) => e2.includes(e)))
    
    for (const majorIndex in general) {
      const major = majors[majorIndex]

      if (majorMap.get(current) && majorMap.get(current)!.includes(major)) {
        continue;
      }

      let tempArr = majorMap.get(current)

      if (tempArr) {
        tempArr.push(major)
        majorMap.set(current, tempArr)
      }
      else {
        majorMap.set(current, [major])
      }

      const oneMajor = general[majorIndex];
      const bestReq = pickBestReq(oneMajor, requirementsSatisfied, major)
      if (oneMajor.indexOf(bestReq) >= 0) {
        oneMajor.splice(oneMajor.indexOf(bestReq), 1);
      };
    }
    if (!coursesForSchedule.includes(current)) { coursesForSchedule.push(current); }
  }

  const outOfMajorReqs = allData.map((data) => data.outOfMajorReqs)
  console.log(outOfMajorReqs)
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
    let bestCourse = await pickBestCourse(filteredOutOfMajor, majors, majorMap, coursesForSchedule, allData);
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
  const restOfClasses = await randomClassFilling(filteredGeneral, coursesForSchedule, majors, majorMap);
  restOfClasses.forEach(course => coursesForSchedule.push(course))

  return coursesForSchedule;
}

async function randomClassFilling(filteredGeneral: string[][], coursesAlreadyTaken: string[], majors: string[], majorMap: Map<string, string[]>) {
  const coursesAdded: string[] = [];
  await Promise.all(
    filteredGeneral.map(async (major, acc) => {

      await Promise.all(

        major.map(async (requirement) => {

          const courses = await getCoursesPerReq(requirement);
          let chosen = false;
          let a: number = Math.floor(Math.random() * courses.length);

          while (!chosen) {
            a = (a + 1) % (courses.length - 1);
            const chosenCourse = courses[a];

            const b = majorMap.get(chosenCourse);
            const chosenCoursePrereqs = await queryPrereqs(chosenCourse);
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
      );
      acc++;
      //return
    })
  );
  return coursesAdded;
}

async function pickBestCourse(filteredOutOfMajor: string[][], majors: string[], majorMap: Map<string, string[]>, coursesForSchedule: string[], allData: any) {

  const filteredOutOfMajorReqs1 =  filteredOutOfMajor.map((major,acc) => {})
  const filteredOutOfMajorReqs = await Promise.all(
    Array.from(
      new Set(
        (
          await Promise.all(
            filteredOutOfMajor.map(async (major) => {
              const courses = await Promise.all(major.map(async (e) => await getCoursesPerReq(e)));
              return courses;
            })
          )
        ).map(e => e.flat()).flat()
      )
    )
  );

  const sortedArr = await Promise.all(filteredOutOfMajorReqs.map(async (item) => ({
    item,
    majorsCount: synchronousGetMajorsPerCourse(item,allData).length
  })))
    .then((resultArray) => resultArray.sort((a, b) => (b.majorsCount - a.majorsCount)))
    .then((sortedArray) => sortedArray.map((item) => item.item));

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

async function getTotalCreditNumber(schedule: string[][]): Promise<number>{
  let credits = 0;
  for(const semester of schedule){
    for(const course of semester){
      let courseObj = await queryCourse(course);
      console.log(courseObj);
    }
  }
  return credits;
}

function synchronousGetPrereqs(course: string, allData: any){
  let prereqs: string[] = []
  for(const singleMajorData of allData){
    const prereqMap = singleMajorData.prereqMap
    let prereqs = prereqMap.get(course)
    return prereqs ?? undefined;
  }
  return prereqs;
}

function synchronousGetMajorReqs(major:string, allData: any){
  for(const singleMajorData of allData){
    if(major === singleMajorData.major){
      return singleMajorData.majorRequirements;
    }
  }
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