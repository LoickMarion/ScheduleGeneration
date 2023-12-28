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
function parseCourseJSONtoArr(jsonData) {
    var output = [];
    jsonData.forEach(function (e) {
        var major = e.major;
        var courseNumber = e.courseNumber;
        var fall = e.fall;
        var spring = e.spring;
        var credits = e.credits;
        output.push([major, courseNumber, fall, spring, credits]);
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
                    query = 'SELECT * FROM prereq_table WHERE course = ' + course + ';';
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
                    query = 'SELECT * FROM course_table WHERE CONCAT(major,courseNumber) = ' + course + ';';
                    return [4 /*yield*/, (0, database_1.fetchDataFromDatabase)(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseCourseJSONtoArr(courses)];
            }
        });
    });
}
function getCoursesToTake(userInput) {
    return __awaiter(this, void 0, void 0, function () {
        var courseList, coursesToAddFromUser, course, prereqs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    courseList = [];
                    coursesToAddFromUser = userInput;
                    _a.label = 1;
                case 1:
                    if (!(coursesToAddFromUser.length > 0)) return [3 /*break*/, 4];
                    course = coursesToAddFromUser[0];
                    if (!!courseList.includes(course)) return [3 /*break*/, 3];
                    courseList.push(course);
                    return [4 /*yield*/, queryPrereqs(course)];
                case 2:
                    prereqs = _a.sent();
                    //handles the or in the SQL database
                    prereqs.forEach(function (prereq) {
                        var orClasses = prereq.split('||');
                        coursesToAddFromUser.push(orClasses[0]);
                    });
                    _a.label = 3;
                case 3:
                    coursesToAddFromUser.shift();
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, courseList];
            }
        });
    });
}
function returnSchedule(input) {
    return __awaiter(this, void 0, void 0, function () {
        var classMap, nodeMap, classesToTake, classList, classStringList, a, b, c, d;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    classMap = new Map();
                    nodeMap = new Map();
                    return [4 /*yield*/, getCoursesToTake(input)];
                case 1:
                    classesToTake = _a.sent();
                    classList = [];
                    classesToTake.forEach(function (classString) { return __awaiter(_this, void 0, void 0, function () {
                        var courseData, prereqData, course;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, queryCourse(classString)];
                                case 1:
                                    courseData = _a.sent();
                                    return [4 /*yield*/, queryPrereqs(classString)];
                                case 2:
                                    prereqData = _a.sent();
                                    course = new course_1.Course(courseData[0], courseData[1], prereqData, courseData[2], courseData[3], courseData[4]);
                                    //Fix ^
                                    classList.push(course);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    classList.forEach(function (Course) { return nodeMap.set(Course.getMajor() + Course.getNumber(), new course_1.Node(Course, [])); });
                    classStringList = [];
                    classList.forEach(function (Course) { return classStringList.push(Course.getMajor() + Course.getNumber()); });
                    classList.forEach(function (Course) { return classMap.set(Course.getMajor() + Course.getNumber(), Course); });
                    a = new course_1.Graph(nodeMap, classStringList, 16);
                    b = a.getNodeMap();
                    c = a.topoSort();
                    console.log(c);
                    d = a.makeSchedule();
                    //console.log(b.get("CS240"));
                    return [2 /*return*/, d];
            }
        });
    });
}
var test = ['CS589', 'CS377'];
var pleaseowkr = returnSchedule(test);
console.log(pleaseowkr);
