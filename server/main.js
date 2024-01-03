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
function returnSchedule(input) {
    return __awaiter(this, void 0, void 0, function () {
        var classMap, nodeMap, classesToTake, classList, promises, classStringList, a, b, c, d;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classMap = new Map();
                    nodeMap = new Map();
                    return [4 /*yield*/, getCoursesToTake(input, [], [], '')];
                case 1:
                    classesToTake = _a.sent();
                    classList = [];
                    promises = classesToTake.map(function (classString) { return __awaiter(_this, void 0, void 0, function () {
                        var courseData, prereqData, test, course;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, queryCourse(classString)];
                                case 1:
                                    courseData = (_a.sent())[0];
                                    return [4 /*yield*/, queryPrereqs(classString)];
                                case 2:
                                    prereqData = _a.sent();
                                    test = prereqData.map(function (e) { return e.split('||')[0]; });
                                    console.log(classString);
                                    course = new course_1.Course(courseData[0], courseData[1], test, courseData[2], courseData[3], courseData[4]);
                                    console.log(course);
                                    classList.push(course);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _a.sent();
                    //console.log(classList);
                    classList.forEach(function (Course) { return nodeMap.set(Course.getMajor() + Course.getNumber(), new course_1.Node(Course, [])); });
                    classStringList = [];
                    classList.forEach(function (Course) { return classStringList.push(Course.getMajor() + Course.getNumber()); });
                    classList.forEach(function (Course) { return classMap.set(Course.getMajor() + Course.getNumber(), Course); });
                    a = new course_1.Graph(nodeMap, classStringList, 16);
                    b = a.getNodeMap();
                    c = a.topoSort();
                    console.log(c);
                    console.log('Generating Schedule');
                    d = a.makeSchedule();
                    //console.log(b.get("CS240"));
                    return [2 /*return*/, d];
            }
        });
    });
}
function testFunc() {
    return __awaiter(this, void 0, void 0, function () {
        var test, pleaseowkr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = ['CS574', 'CS590AE', 'CS590X'];
                    return [4 /*yield*/, returnSchedule(test)];
                case 1:
                    pleaseowkr = _a.sent();
                    console.log("the schedule is \n");
                    console.log(pleaseowkr);
                    return [2 /*return*/];
            }
        });
    });
}
//try and save courses by prioritizing ones we know we will take to be smart
//for example, courses double counted towards multiple majors/minors
//for example, explicitly required courses
//then try every combination of remaining courses for 'or prereqs' and randomly pick ones for electives and then grade based on criteria
function getCoursesHelper(courseList, coursesToAdd, electivesChosen) {
    return __awaiter(this, void 0, void 0, function () {
        var course, prereqs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(coursesToAdd.length > 0)) return [3 /*break*/, 3];
                    course = coursesToAdd[0];
                    if (!!courseList.includes(course)) return [3 /*break*/, 2];
                    courseList.push(course);
                    return [4 /*yield*/, queryPrereqs(course)];
                case 1:
                    prereqs = _a.sent();
                    //handles the or in the SQL database
                    prereqs.forEach(function (prereq) {
                        var orClasses = prereq.split('||');
                        coursesToAdd.push(orClasses[0]);
                    });
                    _a.label = 2;
                case 2:
                    coursesToAdd.shift();
                    return [3 /*break*/, 0];
                case 3: return [2 /*return*/, courseList];
            }
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
            return [2 /*return*/, getCoursesHelper(courseList, coursesToAdd, electivesChosen)];
        });
    });
}
testFunc();
