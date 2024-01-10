import { getJSDocReadonlyTag } from "typescript";
import { Course, Node, Graph } from "./course";
import { getReqsPerCourse, getCoursesPerReq, queryPrereqs, getMajorRequirements, queryCourse, getOutOfMajorRecs, getMajorsPerCourse, } from "./database";
import * as majorPriorityArrays from "./DatabaseDataEntry/majorPriorityArrays.json";

function wait(ms: number): Promise<void> { //Use for test, can delete at end
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function testFunc() {
  const testMajors: string[] = ['CS', 'MATH'];
  const testCourses: string[] = ['CS589', 'CS564', 'CS501']
  generateSchedule(testCourses, testMajors);
  //scheduleFromCourseList(testCourses)
  //let a = await completeSchedule([], test);

}
async function scheduleFromCourseList(classesInSchedule: string[]) {

  const classMap = new Map<string, Course>();
  let nodeMap = new Map<string, Node<Course>>();
  const classList: Course[] = [];

//  (classesInSchedule.forEach(async (classString) => {
//     const courseData = await queryCourse(classString);
//     const prereqData = await queryPrereqs(classString);
//     const course = new Course(courseData[0], courseData[1], prereqData, courseData[2] as unknown as boolean, courseData[3] as unknown as boolean, courseData[4] as unknown as number);
//     classList.push(course);
//   }))

const classPromises = classesInSchedule.map(async (classString) => {
  const courseData = await queryCourse(classString);
  const prereqData = await queryPrereqs(classString);
  const course = new Course(
    courseData[0],
    courseData[1],
    prereqData,
    courseData[2] as unknown as boolean,
    courseData[3] as unknown as boolean,
    courseData[4] as unknown as number
  );
  return course;
});

Promise.all(classPromises)
  .then((courses) => {
    // 'courses' will contain the resolved results of all promises
    // You can now work with the 'courses' array here
    classList.push(...courses);
  })
  .catch((error) => {
    // Handle errors here if any of the promises fail
    console.error(error);
  });
  
  classList.forEach((Course) => nodeMap.set(Course.getMajor() + Course.getNumber(), new Node(Course, [])));
  const classStringList: string[] = [];
  classList.forEach((Course) => classStringList.push(Course.getMajor()+Course.getNumber()))
  classList.forEach((Course) => classMap.set(Course.getMajor()+Course.getNumber(),Course));

  
  const a = new Graph<Node<Course>>(nodeMap,classStringList,16)
  a.topoSort();
  const d = a.makeSchedule()
  console.log(d)
  return d
}


async function generateSchedule(userRequestedCourses: string[], majors: string[]) {
  let masterList: string[][] = [];
  await expandUserInputViaPrereqs([], userRequestedCourses, masterList);
  masterList = await Promise.all(masterList.map(async (combination) => await completeSchedule(combination, majors)))
  let schedules = await Promise.all(masterList.map(async(list) => await scheduleFromCourseList(list)))
  console.log(schedules)
}


async function expandUserInputViaPrereqs(courseList: string[], coursesToAdd: string[], masterList: any) {

  while (coursesToAdd.length > 0) {       //continue until no more courses to take

    let course = coursesToAdd.shift() //look at the first course we need to add
    let splitCourse = course!.split('||'); //split the courses so we can check is there is an or
    let shouldBreak = false;

    if (splitCourse.length > 1) {

      if (splitCourse.some((e) => (courseList.includes(e) || coursesToAdd.includes(e)))) {
        continue;
      }
      else {
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
  masterList.push(courseList);
}

async function completeSchedule(coursesSelectedInput: string[], majors: string[]) {

  const coursesForSchedule: string[] = [];
  const coursesLeftToAdd = coursesSelectedInput.slice();
  //array of REQUIRED courses per major
  const majorRequirements = await Promise.all(majors.map(async (e) => await getMajorRequirements(e)));

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
    const requirementsSatisfied = await getReqsPerCourse(current);
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

  const outOfMajorRecs = await Promise.all(majors.map(async (e) => (await getOutOfMajorRecs(e))[1]));
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
      outOfMajorRecs[majorIndex].includes(generalClass) ? filteredOutOfMajor[majorIndex].push(generalClass) : filteredGeneral[majorIndex].push(generalClass)
    }
  }

  //while reqs left in filteredOutOfMajor
  //do the wonky array + a bit more to find best class to take
  //remove the reqs it counts for from filteredOutOfMajor
  //add class to schedule
  while (filteredOutOfMajor.some((e) => (e.length > 0))) {
    let bestCourse = await pickBestCourse(filteredOutOfMajor, majors, majorMap, coursesForSchedule);
    const requirementsSatisfied = await getReqsPerCourse(bestCourse!)

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
  filteredGeneral.forEach(async (major, acc) => {
    major.forEach(async requirement => {
      //pick random course that meets requirement
      const courses = await getCoursesPerReq(requirement);
      let chosen = false;
      let a: number = Math.floor(Math.random() * courses.length);

      while (!chosen) {
        a = (a + 1) % (courses.length - 1)
        const chosenCourse = courses[a];

        //check if we can take it
        const b = majorMap.get(chosenCourse)
        const chosenCoursePrereqs = await queryPrereqs(chosenCourse)
        const prereqsSatisfied = chosenCoursePrereqs.every((e) => e.split('||').some((split) => coursesForSchedule.includes(split)))
        const courseAlreadyTaken = coursesForSchedule.includes(chosenCourse)
        if (courseAlreadyTaken || !prereqsSatisfied || (b && b.includes(majors[acc]))) {
          continue;
        } else {
          coursesForSchedule.push(chosenCourse)
          chosen = true;
        }

      }
    })
    acc++;
  })
  await wait(1000)
  //console.log(coursesForSchedule)
  return coursesForSchedule;
}

testFunc();

async function pickBestCourse(filteredOutOfMajor: string[][], majors: string[], majorMap: Map<string, string[]>, coursesForSchedule: string[]) {

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
    majorsCount: (await getMajorsPerCourse(item)).length
  })))
    .then((resultArray) => resultArray.sort((a, b) => (b.majorsCount - a.majorsCount)))
    .then((sortedArray) => sortedArray.map((item) => item.item));

  for (const possibleCourse of sortedArr) {
    const chosenCoursePrereqs = await queryPrereqs(possibleCourse)
    const prereqsSatisfied = chosenCoursePrereqs.every((e) => e.split('||').some((split) => coursesForSchedule.includes(split)))
    if (!coursesForSchedule.includes(possibleCourse) && !majorMap.get(possibleCourse) && prereqsSatisfied) {
      majorMap.set(possibleCourse, await getMajorsPerCourse(possibleCourse))
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

function hasProperty(JSON_Object: any, key: keyof any) {
  return JSON_Object[key] !== undefined;
}
