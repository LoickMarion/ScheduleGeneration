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
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
testFunc();
function testFunc() {
    return __awaiter(this, void 0, void 0, function () {
        var testMajors, genEDArr, finalMajorArr, testCourses, coursesAlreadyTaken, allData, schedule;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testMajors = ['CS', 'MATH', 'GENED2'];
                    genEDArr = [];
                    finalMajorArr = testMajors.concat(genEDArr);
                    testCourses = ['CS590AB', 'CS564'];
                    coursesAlreadyTaken = [];
                    return [4 /*yield*/, Promise.all(finalMajorArr.map(function (major) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, database_1.getMajorData)(major)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 1:
                    allData = _a.sent();
                    schedule = generateSchedule(coursesAlreadyTaken, testCourses, testMajors, allData);
                    return [2 /*return*/];
            }
        });
    });
}
function generateSchedule(coursesTaken, userRequestedCourses, majors, allData) {
    return __awaiter(this, void 0, void 0, function () {
        var masterList, b;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    masterList = [];
                    expandUserInputViaPrereqs([], userRequestedCourses, masterList, allData);
                    return [4 /*yield*/, completeSchedule(masterList[0], majors, allData)];
                case 1:
                    b = _a.sent();
                    console.log(b);
                    return [2 /*return*/];
            }
        });
    });
}
function scheduleFromCourseList(classesInSchedule) {
    return __awaiter(this, void 0, void 0, function () {
        var classMap, nodeMap, classList, classStringList, a, c, d;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classMap = new Map();
                    nodeMap = new Map();
                    classList = [];
                    //console.log('hi')
                    return [4 /*yield*/, Promise.all(classesInSchedule.map(function (classString) { return __awaiter(_this, void 0, void 0, function () {
                            var courseData, prereqData, mappedPrereqs, course;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, database_1.queryCourse)(classString)];
                                    case 1:
                                        courseData = _a.sent();
                                        return [4 /*yield*/, (0, database_1.queryPrereqs)(classString)];
                                    case 2:
                                        prereqData = _a.sent();
                                        mappedPrereqs = prereqData.map(function (prereq) {
                                            var splitPrereq = prereq.split('||');
                                            if (splitPrereq.length == 1) {
                                                return splitPrereq[0];
                                            }
                                            else {
                                                return splitPrereq.filter(function (e) { return classesInSchedule.includes(e); })[0];
                                            }
                                        });
                                        course = new course_1.Course(courseData[0], courseData[1], mappedPrereqs, courseData[2], courseData[3], courseData[4]);
                                        // console.log(classString)
                                        // console.log(course);
                                        classList.push(course);
                                        return [2 /*return*/, course];
                                }
                            });
                        }); }))];
                case 1:
                    //console.log('hi')
                    _a.sent();
                    //console.log(classList)
                    classList.forEach(function (Course) { return nodeMap.set(Course.getMajor() + Course.getNumber(), new course_1.Node(Course, [])); });
                    classStringList = [];
                    classList.forEach(function (Course) { return classStringList.push(Course.getMajor() + Course.getNumber()); });
                    classList.forEach(function (Course) { return classMap.set(Course.getMajor() + Course.getNumber(), Course); });
                    a = new course_1.Graph(nodeMap, classStringList, 16);
                    c = a.topoSort();
                    d = a.makeSchedule();
                    return [2 /*return*/, d];
            }
        });
    });
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
function completeSchedule(coursesSelectedInput, majors, allData) {
    return __awaiter(this, void 0, void 0, function () {
        var coursesForSchedule, coursesLeftToAdd, majorRequirements, specific, general, majorMap, _loop_1, majorIndex, _i, coursesLeftToAdd_1, current, requirementsSatisfied, filteredReqs, majorIndex, major, tempArr, oneMajor, bestReq, outOfMajorReqs, filteredOutOfMajor, filteredGeneral, i, majorIndex, _a, _b, generalClass, bestCourse, requirementsSatisfied, majorIndex, major, oneMajor, bestReq, restOfClasses;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    coursesForSchedule = [];
                    coursesLeftToAdd = coursesSelectedInput.slice();
                    majorRequirements = majors.map(function (e) { return synchronousGetMajorReqs(e, allData); });
                    specific = majorRequirements.map(function (e) { return e[0]; });
                    general = majorRequirements.map(function (e) { return e[1]; });
                    majorMap = new Map();
                    _loop_1 = function (majorIndex) {
                        var major = majors[majorIndex];
                        specific[majorIndex].forEach(function (req) {
                            if (!coursesForSchedule.includes(req)) {
                                coursesForSchedule.push(req);
                                var tempArr = majorMap.get(req);
                                if (tempArr) {
                                    tempArr.push(major);
                                    majorMap.set(req, tempArr);
                                }
                                else {
                                    majorMap.set(req, [major]);
                                }
                            }
                            if (!coursesLeftToAdd.includes(req)) {
                                coursesLeftToAdd.push(req);
                            }
                        });
                    };
                    //loops through specific courses and automatically adds them. Adds them to list of courses to process in next step in case they can be eectives for other major
                    for (majorIndex in specific) {
                        _loop_1(majorIndex);
                    }
                    //processes a list based on classes fro m specifics and classes that we need to take based on user input and eliminates all major requirements it can
                    for (_i = 0, coursesLeftToAdd_1 = coursesLeftToAdd; _i < coursesLeftToAdd_1.length; _i++) {
                        current = coursesLeftToAdd_1[_i];
                        requirementsSatisfied = synchronousGetReqsPerCourse(current, allData);
                        filteredReqs = requirementsSatisfied.filter(function (e) { return (general).some(function (e2) { return e2.includes(e); }); });
                        for (majorIndex in general) {
                            major = majors[majorIndex];
                            if (majorMap.get(current) && majorMap.get(current).includes(major)) {
                                continue;
                            }
                            tempArr = majorMap.get(current);
                            if (tempArr) {
                                tempArr.push(major);
                                majorMap.set(current, tempArr);
                            }
                            else {
                                majorMap.set(current, [major]);
                            }
                            oneMajor = general[majorIndex];
                            bestReq = pickBestReq(oneMajor, requirementsSatisfied, major);
                            if (oneMajor.indexOf(bestReq) >= 0) {
                                oneMajor.splice(oneMajor.indexOf(bestReq), 1);
                            }
                            ;
                        }
                        if (!coursesForSchedule.includes(current)) {
                            coursesForSchedule.push(current);
                        }
                    }
                    outOfMajorReqs = allData.map(function (data) { return data.outOfMajorReqs; });
                    console.log(outOfMajorReqs);
                    filteredOutOfMajor = [];
                    filteredGeneral = [];
                    for (i = 0; i < majors.length; i++) {
                        filteredOutOfMajor.push([]);
                        filteredGeneral.push([]);
                    }
                    //sorts remianing requirements based on whether or not it can be satisfied by an out of major course as we need to be smart about which course we pick for those.
                    //uses a nested for loop to find each class and then determines if that class is out of major eligible or not. Pushes to corrosponding array
                    for (majorIndex in general) {
                        for (_a = 0, _b = general[majorIndex]; _a < _b.length; _a++) {
                            generalClass = _b[_a];
                            outOfMajorReqs[majorIndex].includes(generalClass) ? filteredOutOfMajor[majorIndex].push(generalClass) : filteredGeneral[majorIndex].push(generalClass);
                        }
                    }
                    _c.label = 1;
                case 1:
                    if (!filteredOutOfMajor.some(function (e) { return (e.length > 0); })) return [3 /*break*/, 3];
                    return [4 /*yield*/, pickBestCourse(filteredOutOfMajor, majors, majorMap, coursesForSchedule, allData)];
                case 2:
                    bestCourse = _c.sent();
                    requirementsSatisfied = synchronousGetReqsPerCourse(bestCourse, allData);
                    for (majorIndex in filteredOutOfMajor) {
                        major = majors[majorIndex];
                        oneMajor = filteredOutOfMajor[majorIndex];
                        bestReq = pickBestReq(oneMajor, requirementsSatisfied, major);
                        if (oneMajor.indexOf(bestReq) >= 0) {
                            oneMajor.splice(oneMajor.indexOf(bestReq), 1);
                        }
                        ;
                    }
                    coursesForSchedule.push(bestCourse);
                    return [3 /*break*/, 1];
                case 3: return [4 /*yield*/, randomClassFilling(filteredGeneral, coursesForSchedule, majors, majorMap)];
                case 4:
                    restOfClasses = _c.sent();
                    restOfClasses.forEach(function (course) { return coursesForSchedule.push(course); });
                    return [2 /*return*/, coursesForSchedule];
            }
        });
    });
}
function randomClassFilling(filteredGeneral, coursesAlreadyTaken, majors, majorMap) {
    return __awaiter(this, void 0, void 0, function () {
        var coursesAdded;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    coursesAdded = [];
                    return [4 /*yield*/, Promise.all(filteredGeneral.map(function (major, acc) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Promise.all(major.map(function (requirement) { return __awaiter(_this, void 0, void 0, function () {
                                            var courses, chosen, a, chosenCourse, b, chosenCoursePrereqs, prereqsSatisfied, courseAlreadyTaken;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, (0, database_1.getCoursesPerReq)(requirement)];
                                                    case 1:
                                                        courses = _a.sent();
                                                        chosen = false;
                                                        a = Math.floor(Math.random() * courses.length);
                                                        _a.label = 2;
                                                    case 2:
                                                        if (!!chosen) return [3 /*break*/, 4];
                                                        a = (a + 1) % (courses.length - 1);
                                                        chosenCourse = courses[a];
                                                        b = majorMap.get(chosenCourse);
                                                        return [4 /*yield*/, (0, database_1.queryPrereqs)(chosenCourse)];
                                                    case 3:
                                                        chosenCoursePrereqs = _a.sent();
                                                        prereqsSatisfied = chosenCoursePrereqs.every(function (e) {
                                                            return e.split('||').some(function (split) { return coursesAlreadyTaken.includes(split); });
                                                        });
                                                        courseAlreadyTaken = coursesAlreadyTaken.includes(chosenCourse) || coursesAdded.includes(chosenCourse);
                                                        if (courseAlreadyTaken || !prereqsSatisfied || (b && b.includes(majors[acc]))) {
                                                            return [3 /*break*/, 2];
                                                        }
                                                        else {
                                                            if (!coursesAdded.includes(chosenCourse)) {
                                                                coursesAdded.push(chosenCourse);
                                                                chosen = true;
                                                            }
                                                        }
                                                        return [3 /*break*/, 2];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                    case 1:
                                        _a.sent();
                                        acc++;
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, coursesAdded];
            }
        });
    });
}
function pickBestCourse(filteredOutOfMajor, majors, majorMap, coursesForSchedule, allData) {
    return __awaiter(this, void 0, void 0, function () {
        var filteredOutOfMajorReqs, _a, _b, _c, _d, _e, sortedArr, _i, sortedArr_1, possibleCourse, chosenCoursePrereqs, prereqsSatisfied;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _b = (_a = Promise).all;
                    _d = (_c = Array).from;
                    _e = Set.bind;
                    return [4 /*yield*/, Promise.all(filteredOutOfMajor.map(function (major) { return __awaiter(_this, void 0, void 0, function () {
                            var courses;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Promise.all(major.map(function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, (0, database_1.getCoursesPerReq)(e)];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        }); }); }))];
                                    case 1:
                                        courses = _a.sent();
                                        return [2 /*return*/, courses];
                                }
                            });
                        }); }))];
                case 1: return [4 /*yield*/, _b.apply(_a, [_d.apply(_c, [new (_e.apply(Set, [void 0, (_f.sent()).map(function (e) { return e.flat(); }).flat()]))()])])];
                case 2:
                    filteredOutOfMajorReqs = _f.sent();
                    return [4 /*yield*/, Promise.all(filteredOutOfMajorReqs.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, ({
                                        item: item,
                                        //majorsCount: (await getMajorsPerCourse(item)).length
                                        majorsCount: synchronousGetMajorsPerCourse(item, allData).length
                                    })];
                            });
                        }); }))
                            .then(function (resultArray) { return resultArray.sort(function (a, b) { return (b.majorsCount - a.majorsCount); }); })
                            .then(function (sortedArray) { return sortedArray.map(function (item) { return item.item; }); })];
                case 3:
                    sortedArr = _f.sent();
                    for (_i = 0, sortedArr_1 = sortedArr; _i < sortedArr_1.length; _i++) {
                        possibleCourse = sortedArr_1[_i];
                        chosenCoursePrereqs = synchronousGetPrereqs(possibleCourse, allData);
                        prereqsSatisfied = chosenCoursePrereqs.every(function (e) { return e.split('||').some(function (split) { return coursesForSchedule.includes(split); }); });
                        if (!coursesForSchedule.includes(possibleCourse) && !majorMap.get(possibleCourse) && prereqsSatisfied) {
                            //majorMap.set(possibleCourse, await getMajorsPerCourse(possibleCourse))
                            majorMap.set(possibleCourse, synchronousGetMajorsPerCourse(possibleCourse, allData));
                            return [2 /*return*/, possibleCourse];
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
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
function getTotalCreditNumber(schedule) {
    return __awaiter(this, void 0, void 0, function () {
        var credits, _i, schedule_1, semester, _a, semester_1, course, courseObj;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    credits = 0;
                    _i = 0, schedule_1 = schedule;
                    _b.label = 1;
                case 1:
                    if (!(_i < schedule_1.length)) return [3 /*break*/, 6];
                    semester = schedule_1[_i];
                    _a = 0, semester_1 = semester;
                    _b.label = 2;
                case 2:
                    if (!(_a < semester_1.length)) return [3 /*break*/, 5];
                    course = semester_1[_a];
                    return [4 /*yield*/, (0, database_1.queryCourse)(course)];
                case 3:
                    courseObj = _b.sent();
                    console.log(courseObj);
                    _b.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, credits];
            }
        });
    });
}
function synchronousGetPrereqs(course, allData) {
    var prereqs = [];
    for (var _i = 0, allData_1 = allData; _i < allData_1.length; _i++) {
        var singleMajorData = allData_1[_i];
        var prereqMap = singleMajorData.prereqMap;
        var prereqs_1 = prereqMap.get(course);
        return prereqs_1 !== null && prereqs_1 !== void 0 ? prereqs_1 : undefined;
    }
    return prereqs;
}
function synchronousGetMajorReqs(major, allData) {
    for (var _i = 0, allData_2 = allData; _i < allData_2.length; _i++) {
        var singleMajorData = allData_2[_i];
        if (major === singleMajorData.major) {
            return singleMajorData.majorRequirements;
        }
    }
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
