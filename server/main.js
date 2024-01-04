"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var database_1 = require("./database");
function parseCourseJSONtoArr(jsonData) {
    var output = [];
    jsonData.forEach(function (e) {
        var layer = [];
        var major = e.major;
        var courseNumber = e.courseNumber;
        var fall = e.fall;
        var spring = e.spring;
        var credits = e.credits;
        layer.push(major);
        layer.push(courseNumber);
        layer.push(fall);
        layer.push(spring);
        layer.push(credits);
        output.push(layer);
    });
    return output;
}
function parsePrereqJSONtoArr(jsonData) {
    var output = [];
    jsonData.forEach(function (e) {
        var prereq = e.prereq;
        output.push(prereq);
    });
    return output;
}
function queryPrereqs(course) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM prereq_table WHERE course = '" + course + "';";
                    return [4 /*yield*/, (0, database_1.fetchDataFromDatabase)(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parsePrereqJSONtoArr(courses)];
            }
        });
    });
}
function queryCourse(course) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM course_table WHERE major || courseNumber = '" + course + "';";
                    return [4 /*yield*/, (0, database_1.fetchDataFromDatabase)(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseCourseJSONtoArr(courses)];
            }
        });
    });
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
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function testFunc() {
    return __awaiter(this, void 0, void 0, function () {
        var test, list, a, minValue, minList, maxValue, maxList, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = ['CS590AB'];
                    list = [];
                    return [4 /*yield*/, expandUserInputViaPrereqs([], test, [], list)];
                case 1:
                    a = _a.sent();
                    console.log('Waiting for 5 seconds...');
                    return [4 /*yield*/, wait(3000)];
                case 2:
                    _a.sent(); // 5000 milliseconds = 5 seconds
                    console.log('Finished waiting.');
                    minValue = 1000;
                    minList = [];
                    maxValue = 0;
                    maxList = [];
                    for (i = 0; i < list.length; i++) {
                        if (minValue > list[i].length) {
                            minList = list[i];
                            minValue = list[i].length;
                        }
                        else if (maxValue < list[i].length) {
                            maxList = list[i];
                            maxValue = list[i].length;
                        }
                    }
                    console.log('the smallest set of courses has ' + minValue + 'courses.\n' + minList);
                    console.log('the biggest set of courses has ' + maxValue + 'courses.\n' + maxList);
                    return [2 /*return*/];
            }
        });
    });
}
"\n//chat gpt's function\nasync function expandUserInputViaPrereqs(courseList, coursesToAdd, electivesChosen, masterList) {\n  while (coursesToAdd.length > 0) {\n    const course = coursesToAdd.shift();\n    \n    if (!courseList.includes(course)) {\n      courseList.push(course);\n      const prereqs = await queryPrereqs(course);\n\n      const promises = prereqs.map(async (prereq) => {\n        const orClasses = prereq.split('||');\n        \n        if (orClasses.length === 1 && !coursesToAdd.includes(orClasses[0])) {\n          coursesToAdd.push(orClasses[0]);\n        } else {\n          let shouldReturn = false;\n\n          for (let i = 0; i < orClasses.length; i++) {\n            if (courseList.includes(orClasses[i]) || coursesToAdd.includes(orClasses[i])) {\n              return; // Prerequisite already satisfied\n            } else if (electivesChosen.includes(orClasses[i])) {\n              coursesToAdd.push(orClasses[i]);\n              return; // Elective chosen as a prerequisite\n            }\n          }\n\n          shouldReturn = true;\n          const subPromises = orClasses.map(async (e) => {\n            const newCourseList = courseList.slice();\n            const newCoursesToAdd = coursesToAdd.slice();\n            const newElectives = electivesChosen.slice();\n            newCoursesToAdd.push(e);\n            newElectives.push(e);\n\n            await expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, newElectives, masterList);\n          });\n\n          await Promise.all(subPromises); // Wait for all recursive calls to complete\n        }\n      });\n\n      await Promise.all(promises); // Wait for all iterations to complete before continuing\n    }\n  }\n\n  masterList.push(courseList);\n}\n\n";
function expandUserInputViaPrereqs(courseList, coursesToAdd, electivesChosen, masterList) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, state_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function () {
                        var course, shouldReturn_1, prereqs;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    course = coursesToAdd.shift() //look at the first course we need to add
                                    ;
                                    if (!!courseList.includes(course)) return [3 /*break*/, 2];
                                    shouldReturn_1 = false;
                                    //add the course to list courses we have process
                                    courseList.push(course);
                                    return [4 /*yield*/, queryPrereqs(course)];
                                case 1:
                                    prereqs = _b.sent();
                                    //allows so if multiple classes can meet a prereq, every one gets tested.
                                    console.log(prereqs);
                                    prereqs.forEach(function (prereq) {
                                        //console.log(prereq);
                                        //exits forEach if we should return
                                        // if(shouldReturn){
                                        //   return;
                                        // }
                                        var orClasses = prereq.split('||');
                                        console.log(orClasses);
                                        if (orClasses.length == 1 && !(coursesToAdd.includes(orClasses[0]))) {
                                            //if there is only one prereq, add it to list of courses we need to take if it isnt there already and carry on as normal.
                                            console.log(orClasses[0]);
                                            coursesToAdd.push(orClasses[0]);
                                            return;
                                        }
                                        else {
                                            //check if a possible elective is one we have chosen before. If so, choose it again. and we dont need to take any more courses to fulfil this requirement.
                                            for (var i = 0; i < coursesToAdd.length; i++) {
                                                if (courseList.includes(orClasses[i]) || coursesToAdd.includes(orClasses[i])) {
                                                    //continue to next iteration of foreach loop as this prereq is already satisfied.
                                                    return;
                                                }
                                                //if it is determined that we intend to use a course as a prerequisite but we haven't taken it yet, we add it to our courseList
                                                else if (electivesChosen.includes(orClasses[i])) {
                                                    coursesToAdd.push(orClasses[i]);
                                                    return;
                                                }
                                            }
                                            shouldReturn_1 = true;
                                            orClasses.forEach(function (e) { return __awaiter(_this, void 0, void 0, function () {
                                                var newCourseList, newCoursesToAdd, newElectives;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            newCourseList = courseList.slice();
                                                            newCoursesToAdd = coursesToAdd.slice();
                                                            newElectives = electivesChosen.slice();
                                                            newCoursesToAdd.push(e);
                                                            newElectives.push(e);
                                                            return [4 /*yield*/, expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, newElectives, masterList)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                        }
                                    });
                                    //exits funtion if we should return
                                    if (shouldReturn_1) {
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    _b.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (!(coursesToAdd.length > 0)) return [3 /*break*/, 3];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    return [3 /*break*/, 1];
                case 3:
                    //console.log(courseList)
                    masterList.push(courseList);
                    return [2 /*return*/];
            }
        });
    });
}
function getCoursesHelper(courseList, coursesToAdd, electivesChosen) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
//need the data of what to take from each major
//required [CIC110, CICS 160, CICS210,...,CS311, CICS305]
//I.E
//Electives [300+,300+,300+...400+]
//Add required courses for each major/minor and primary major IE to coursestoTake array?
//Add prereqs and Electives to an array to be processed
//process them
function getCoursesToTake(userInput, majorList, minorList, criteria) {
    return __awaiter(this, void 0, void 0, function () {
        var courseList, coursesToAdd, electivesChosen;
        return __generator(this, function (_a) {
            courseList = [];
            coursesToAdd = userInput;
            electivesChosen = [];
            return [2 /*return*/, expandUserInputViaPrereqs(courseList, coursesToAdd, electivesChosen, [])];
        });
    });
}
testFunc();
