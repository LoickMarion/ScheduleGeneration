import { getJSDocReadonlyTag } from "typescript";
import { Course, Node, Graph } from "./course";
import {getReqsPerCourse, getCoursesPerReq, queryPrereqs, getMajorRequirements, queryCourse}  from "./database";
import * as majorPriorityArrays from "./DatabaseDataEntry/majorPriorityArrays.json";



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
  let a = await completeSchedule(['CS589', 'CS383', 'MATH545'],test);
  //console.log(a);
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

async function completeSchedule(coursesSelectedInput: string[], majors: string[]){

  const coursesToTake: string[] = [];
  const coursesSelected = coursesSelectedInput.slice();
  //array of REQUIRED courses per major
  const majorRequirements = await Promise.all(majors.map(async (e) => await getMajorRequirements(e)));
  const specific = majorRequirements.map((e) => e[0])
  const general = majorRequirements.map((e) => e[1])

  let majorMap = new Map<string,number>(); //keep track of which majors a course has been counted for so you dont reuse a course for a specific and electivem e.g. 545 counting for a math elective after being explicitly reuired
  //loop through specifics. add to courses Selected to test so we can test them for other majors
  specific.forEach((major)=> {
    let index = specific.indexOf(major)
    major.forEach(req => {
      if(!coursesToTake.includes(req)){
        coursesToTake.push(req);
        majorMap.set(req,index)
      }
      if(!coursesSelected.includes(req)){
        coursesSelected.push(req);
      }
      
  })});

  //const nonSpecificMajorRequirements = majorRequirements.filter()  

  console.log(general);

  for(const current in coursesSelected){
    console.log(coursesSelected[current]);
    const requirementsSatisfied = await getReqsPerCourse(coursesSelected[current]);
    console.log(requirementsSatisfied)
    const filteredReqs = requirementsSatisfied.filter((e) => (general).some((e2)=>e2.includes(e)))
    console.log(filteredReqs)
    general.forEach((oneMajor) => {
      const index = general.indexOf(oneMajor);
      const bestReq = pickBestReq(oneMajor, requirementsSatisfied,majors[index])
      console.log(bestReq)
      if(oneMajor.indexOf(bestReq) >= 0) { 
        oneMajor.splice(oneMajor.indexOf(bestReq),1);
        //console.log('removing ' + bestReq + ' from major ' + majors[index] + ' from course ' + coursesSelected[current]);
      };
      
    })
    //coursesTaken.push(course)
  }
  console.log('after\n')

  // loop through courses selected
  //   finds requirements each class satisfies
  //     limit it to requirements in the chosen major
  //     pick the best rquirement (per major) to assign it to
  // console.log(majorRequirements);
  
//   const coursesPerReq = await Promise.all(
//     majorRequirements.map(async (major) => {
//       const courses = await Promise.all(major.map(async (e) => await getCoursesPerReq(e)));
//       return courses;
//     })
//   );
//   return majorRequirements;
 }

testFunc();

//one major is the requirements remaining for an individual major
//requirements satisfied are the requirements satisfied by a specific course
function pickBestReq(oneMajor: string[], requirementsSatisfied: string[], major: string) {
  const filteredReqs = requirementsSatisfied.filter(e => oneMajor.includes(e))
  //console.log(filteredReqs)
  const curMajorPriority: string[] = majorPriorityArrays[major]
  for(const priority in curMajorPriority){
    if(filteredReqs.includes(curMajorPriority[priority])){ return curMajorPriority[priority] }
  }
  return "None";
}
