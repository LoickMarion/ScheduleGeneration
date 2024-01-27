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
var course_1 = require("./course");
var database_1 = require("./database");
var majorPriorityArrays = require("./DatabaseDataEntry/majorPriorityArrays.json");
var axios_1 = require("axios");
module.exports = { testFunc: testFunc };
testFunc();
function schedToJSON(schedule) {
    var jsonObject = {};
    schedule.forEach(function (subArray, index) {
        var subObject = {}; // Initialize an empty object for each subArray
        subArray.forEach(function (item, itemIndex) {
            subObject["Course " + (itemIndex + 1)] = item;
        });
        jsonObject["Semester " + (index + 1)] = subObject; // Assign the subObject to the corresponding key
    });
    return JSON.stringify(jsonObject, null, 2);
}
function testFunc() {
    return __awaiter(this, void 0, void 0, function () {
        var data, selectedMajors, finalMajorArr, testCourses, coursesAlreadyTaken, allData, creditLimit, schedule, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetchData()];
                case 1:
                    data = _a.sent();
                    selectedMajors = [data.primary];
                    data.secondary != null ? selectedMajors.push(data.secondary) : console.log("No secondary major");
                    data.minor != null ? selectedMajors.push(data.minor) : console.log("No minor");
                    finalMajorArr = ['GENED', 'GENED2'].concat(selectedMajors);
                    console.log(finalMajorArr);
                    testCourses = [];
                    coursesAlreadyTaken = [];
                    return [4 /*yield*/, Promise.all(finalMajorArr.map(function (major) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, database_1.getMajorData)(major)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 2:
                    allData = _a.sent();
                    creditLimit = 17;
                    schedule = generateSchedule(coursesAlreadyTaken, testCourses, finalMajorArr, allData, creditLimit);
                    console.log(schedule);
                    return [2 /*return*/, schedToJSON(schedule)];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get('http://localhost:5000/selected-data')];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data.selectedData];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error fetching selected data:', error_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function generateSchedule(coursesTaken, userRequestedCourses, majors, allData, creditLimit) {
    var masterList = [];
    expandUserInputViaPrereqs([], userRequestedCourses, masterList, allData);
    var completedSchedules = [];
    var coursesAlreadyTaken = [];
    masterList.forEach(function (list) {
        var b = generateSingleSchedule(coursesAlreadyTaken, list, majors, allData, creditLimit);
        completedSchedules.push(b);
    });
    completedSchedules.sort(function (a, b) { return -1000 * (b.length - a.length) - (getTotalCreditNumber(b, allData) - getTotalCreditNumber(a, allData)); });
    return completedSchedules[0];
}
function generateSingleSchedule(coursesAlreadyTaken, list, majors, allData, creditLimit) {
    // console.log('iteration')
    // console.log(list)
    var completedSchedule = completeSchedule(coursesAlreadyTaken, list, majors, allData);
    // console.log(completedSchedule)
    var finishedSchedule = scheduleFromCourseList(completedSchedule, allData, creditLimit, coursesAlreadyTaken);
    // console.log(finishedSchedule)
    // console.log(getTotalCreditNumber(finishedSchedule,allData))
    // console.log('\n')
    return finishedSchedule;
}
function scheduleFromCourseList(classesInSchedule, allData, creditLimit, coursesAlreadyTaken) {
    var classMap = new Map();
    var nodeMap = new Map();
    var classList = [];
    classesInSchedule.forEach(function (classString) {
        var course = synchronousGetCourse(classString, allData);
        if (!course) {
            console.log("Course is undefined");
        }
        else {
            var courseCopy = course.copy();
            classList.push(courseCopy);
        }
    });
    classList.forEach(function (course) {
        var prereqs = course.getPrereqs();
        prereqs = prereqs.map(function (prereq) {
            var splitPrereq = prereq.split('||');
            if (splitPrereq.length == 1) {
                return splitPrereq[0];
            }
            else {
                return splitPrereq.find(function (e) { return classesInSchedule.includes(e) || coursesAlreadyTaken.includes(e); });
            }
        }).filter(function (prereq) { return !coursesAlreadyTaken.includes(prereq); });
        course.setPrereqs(prereqs);
    });
    classList.forEach(function (Course) { return nodeMap.set(Course.getMajor() + Course.getNumber(), new course_1.Node(Course, [])); });
    var classStringList = [];
    classList.forEach(function (Course) { return classStringList.push(Course.getMajor() + Course.getNumber()); });
    classList.forEach(function (Course) { return classMap.set(Course.getMajor() + Course.getNumber(), Course); });
    var graph = new course_1.Graph(nodeMap, classStringList, creditLimit);
    return graph.makeSchedule();
}
function expandUserInputViaPrereqs(courseList, coursesToAdd, masterList, allData) {
    while (coursesToAdd.length > 0) { //continue until no more courses to take
        var course = coursesToAdd.shift(); //look at the first course we need to add
        var splitCourse = course.split('||'); //split the courses so we can check is there is an or
        if (splitCourse.length > 1) {
            if (splitCourse.some(function (e) { return (courseList.includes(e) || coursesToAdd.includes(e)); })) {
                continue;
            }
            else {
                splitCourse.forEach(function (course) {
                    var newCourseList = courseList.slice();
                    var newCoursesToAdd = coursesToAdd.slice();
                    newCoursesToAdd.push(course);
                    expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, masterList, allData);
                });
                return;
            }
        }
        courseList.push(course); //add the course to list courses we have process
        var prereqs = synchronousGetPrereqs(course, allData); //get the prerequisites for a course.
        prereqs.forEach(function (prereq) {
            if (!coursesToAdd.includes(prereq) && !courseList.includes(prereq)) {
                coursesToAdd.push(prereq);
            }
        });
    }
    masterList.push(courseList);
}
function completeSchedule(coursesAlreadyTaken, coursesSelectedInput, majors, allData) {
    var coursesForSchedule = [];
    var coursesLeftToAdd = Array.from(new Set(coursesSelectedInput.slice().concat(coursesAlreadyTaken)));
    //array of REQUIRED courses per major
    //const majorRequirements = await Promise.all(majors.map(async (e) => await getMajorRequirements(e)));
    //const majorRequirements = majors.map((e) => synchronousGetMajorReqs(e,allData).slice());
    var majorRequirements = majors.map(function (e) { return synchronousGetMajorReqs(e, allData); });
    //gets array of courses that can be satisfied by only one course and courses that can be satisfied by multiple courses
    var specific = majorRequirements.map(function (e) { return e[0]; });
    var general = majorRequirements.map(function (e) { return e[1]; });
    //map to keep track of which majors we have used a course for to avoid double counting.
    var majorMap = new Map(); //keep track of which majors a course has been counted for so you dont reuse a course for a specific and electivem e.g. 545 counting for a math elective after being explicitly reuired
    var _loop_1 = function (majorIndex) {
        var major = majors[majorIndex];
        specific[majorIndex].forEach(function (req) {
            var tempArr = majorMap.get(req);
            if (tempArr) {
                tempArr.push(major);
                majorMap.set(req, tempArr);
            }
            else {
                majorMap.set(req, [major]);
            }
            if (!coursesForSchedule.includes(req)) {
                coursesForSchedule.push(req);
            }
            if (!coursesLeftToAdd.includes(req)) {
                coursesLeftToAdd.push(req);
            }
        });
    };
    //loops through specific courses and automatically adds them. Adds them to list of courses to process in next step in case they can be electives for other major
    for (var majorIndex in specific) {
        _loop_1(majorIndex);
    }
    //processes a list based on classes fro m specifics and classes that we need to take based on user input and eliminates all major requirements it can
    for (var _i = 0, coursesLeftToAdd_1 = coursesLeftToAdd; _i < coursesLeftToAdd_1.length; _i++) {
        var current = coursesLeftToAdd_1[_i];
        var requirementsSatisfied = synchronousGetReqsPerCourse(current, allData);
        var filteredReqs = requirementsSatisfied.filter(function (e) { return (general).some(function (e2) { return e2.includes(e); }); });
        //loops through all majors and checks if a course can satisfy something
        for (var majorIndex in general) {
            var major = majors[majorIndex];
            //if course already being used for this major, skip
            if (majorMap.get(current) && majorMap.get(current).includes(major)) {
                continue;
            }
            var oneMajor = general[majorIndex];
            var bestReq = pickBestReq(oneMajor, filteredReqs, major);
            if (oneMajor.indexOf(bestReq) >= 0) {
                oneMajor.splice(oneMajor.indexOf(bestReq), 1);
                var tempArr = majorMap.get(current);
                if (tempArr) {
                    tempArr.push(major);
                    majorMap.set(current, tempArr);
                }
                else {
                }
            }
            ;
        }
        if (!coursesForSchedule.includes(current)) {
            coursesForSchedule.push(current);
        }
    }
    var outOfMajorReqs = allData.map(function (data) { return data.outOfMajorReqs.slice(); });
    var filteredOutOfMajor = [];
    var filteredGeneral = [];
    for (var i = 0; i < majors.length; i++) {
        filteredOutOfMajor.push([]);
        filteredGeneral.push([]);
    }
    //sorts remianing requirements based on whether or not it can be satisfied by an out of major course as we need to be smart about which course we pick for those.
    //uses a nested for loop to find each class and then determines if that class is out of major eligible or not. Pushes to corrosponding array
    for (var majorIndex in general) {
        for (var _a = 0, _b = general[majorIndex]; _a < _b.length; _a++) {
            var generalClass = _b[_a];
            outOfMajorReqs[majorIndex].includes(generalClass) ? filteredOutOfMajor[majorIndex].push(generalClass) : filteredGeneral[majorIndex].push(generalClass);
        }
    }
    //while reqs left in filteredOutOfMajor
    //do the wonky array + a bit more to find best class to take
    //remove the reqs it counts for from filteredOutOfMajor
    //add class to schedule
    while (filteredOutOfMajor.some(function (e) { return (e.length > 0); })) {
        var bestCourse = pickBestCourse(filteredOutOfMajor, majors, majorMap, coursesForSchedule, allData);
        var requirementsSatisfied = synchronousGetReqsPerCourse(bestCourse, allData);
        for (var majorIndex in filteredOutOfMajor) {
            var major = majors[majorIndex];
            var oneMajor = filteredOutOfMajor[majorIndex];
            var bestReq = pickBestReq(oneMajor, requirementsSatisfied, major);
            if (oneMajor.indexOf(bestReq) >= 0) {
                oneMajor.splice(oneMajor.indexOf(bestReq), 1);
            }
            ;
        }
        coursesForSchedule.push(bestCourse);
    }
    var restOfClasses = randomClassFilling(filteredGeneral, coursesForSchedule, majors, majorMap, allData);
    restOfClasses.forEach(function (course) { return coursesForSchedule.push(course); });
    var newClasses = coursesForSchedule.filter(function (e) { return !coursesAlreadyTaken.includes(e); });
    return newClasses;
}
function randomClassFilling(filteredGeneral, coursesAlreadyTaken, majors, majorMap, allData) {
    var _this = this;
    var coursesAdded = [];
    filteredGeneral.map(function (major, acc) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            major.map(function (requirement) { return __awaiter(_this, void 0, void 0, function () {
                var courses, chosen, a, chosenCourse, b, chosenCoursePrereqs, prereqsSatisfied, courseAlreadyTaken;
                return __generator(this, function (_a) {
                    courses = synchronousGetCoursesPerReq(requirement, allData);
                    chosen = false;
                    a = Math.floor(Math.random() * courses.length);
                    while (!chosen) {
                        a = (a + 1) % (courses.length - 1);
                        chosenCourse = courses[a];
                        b = majorMap.get(chosenCourse);
                        chosenCoursePrereqs = synchronousGetPrereqs(chosenCourse, allData);
                        prereqsSatisfied = chosenCoursePrereqs.every(function (e) {
                            return e.split('||').some(function (split) { return coursesAlreadyTaken.includes(split); });
                        });
                        courseAlreadyTaken = coursesAlreadyTaken.includes(chosenCourse) || coursesAdded.includes(chosenCourse);
                        if (courseAlreadyTaken || !prereqsSatisfied || (b && b.includes(majors[acc]))) {
                            continue;
                        }
                        else {
                            if (!coursesAdded.includes(chosenCourse)) {
                                coursesAdded.push(chosenCourse);
                                chosen = true;
                            }
                        }
                    }
                    return [2 /*return*/];
                });
            }); });
            acc++;
            return [2 /*return*/];
        });
    }); });
    return coursesAdded;
}
function pickBestCourse(filteredOutOfMajor, majors, majorMap, coursesForSchedule, allData) {
    var sortedArr = Array.from(new Set(filteredOutOfMajor.map(function (major) { return major.map(function (course) { return synchronousGetCoursesPerReq(course, allData); }); }).flat().flat())).sort(function (a, b) { return synchronousGetMajorsPerCourse(b, allData).length - synchronousGetMajorsPerCourse(a, allData).length; });
    for (var _i = 0, sortedArr_1 = sortedArr; _i < sortedArr_1.length; _i++) {
        var possibleCourse = sortedArr_1[_i];
        var chosenCoursePrereqs = synchronousGetPrereqs(possibleCourse, allData);
        var prereqsSatisfied = chosenCoursePrereqs.every(function (e) { return e.split('||').some(function (split) { return coursesForSchedule.includes(split); }); });
        if (!coursesForSchedule.includes(possibleCourse) && !majorMap.get(possibleCourse) && prereqsSatisfied) {
            majorMap.set(possibleCourse, synchronousGetMajorsPerCourse(possibleCourse, allData));
            return possibleCourse;
        }
    }
}
//one major is the requirements remaining for an individual major
//requirements satisfied are the requirements satisfied by a specific course
function pickBestReq(oneMajor, requirementsSatisfied, major) {
    var filteredReqs = requirementsSatisfied.filter(function (e) { return oneMajor.includes(e); });
    var curMajorPriority = majorPriorityArrays[major];
    for (var _i = 0, curMajorPriority_1 = curMajorPriority; _i < curMajorPriority_1.length; _i++) {
        var priority = curMajorPriority_1[_i];
        if (filteredReqs.includes(priority)) {
            return priority;
        }
    }
    return "None";
}
function getTotalCreditNumber(schedule, allData) {
    var credits = 0;
    for (var _i = 0, schedule_1 = schedule; _i < schedule_1.length; _i++) {
        var semester = schedule_1[_i];
        for (var _a = 0, semester_1 = semester; _a < semester_1.length; _a++) {
            var course = semester_1[_a];
            credits += synchronousGetCourse(course, allData).getCredits();
        }
    }
    return credits;
}
function synchronousGetPrereqs(course, allData) {
    for (var _i = 0, allData_1 = allData; _i < allData_1.length; _i++) {
        var singleMajorData = allData_1[_i];
        var prereqMap = singleMajorData.prereqMap;
        var prereqs = prereqMap.get(course);
        if (prereqs != undefined) {
            return prereqs;
        }
    }
    return [];
}
function synchronousGetMajorReqs(major, allData) {
    var _loop_2 = function (singleMajorData) {
        if (major === singleMajorData.major) {
            var output_1 = [];
            singleMajorData.majorRequirements.forEach(function (e) {
                output_1.push(e.slice());
            });
            return { value: output_1 };
        }
    };
    for (var _i = 0, allData_2 = allData; _i < allData_2.length; _i++) {
        var singleMajorData = allData_2[_i];
        var state_1 = _loop_2(singleMajorData);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return [];
}
function synchronousGetReqsPerCourse(course, allData) {
    var reqs = [];
    for (var _i = 0, allData_3 = allData; _i < allData_3.length; _i++) {
        var singleMajorData = allData_3[_i];
        var reqMap = singleMajorData.courseReqMap;
        var reqs_1 = reqMap.get(course);
        if (reqs_1 != undefined) {
            return reqs_1;
        }
        ;
    }
    return reqs;
}
function synchronousGetMajorsPerCourse(course, allData) {
    var majors = [];
    for (var _i = 0, allData_4 = allData; _i < allData_4.length; _i++) {
        var data = allData_4[_i];
        if (data.reqFulfillingCourses.includes(course)) {
            majors.push(data.major);
        }
    }
    return majors;
}
function synchronousGetCoursesPerReq(req, allData) {
    for (var _i = 0, allData_5 = allData; _i < allData_5.length; _i++) {
        var data = allData_5[_i];
        var courses = data.majorReqMap.get(req);
        if (courses != undefined) {
            return courses;
        }
    }
    return [];
}
function synchronousGetCourse(courseName, allData) {
    for (var _i = 0, allData_6 = allData; _i < allData_6.length; _i++) {
        var data = allData_6[_i];
        if (data.possibleCoursesMap.has(courseName)) {
            var returnedCourseName = data.possibleCoursesMap.get(courseName);
            return returnedCourseName;
        }
    }
}
