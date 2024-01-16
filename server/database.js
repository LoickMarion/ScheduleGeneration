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
exports.queryCourse = exports.queryEntireMajor = exports.queryPrereqs = exports.getMajorRequirements = exports.getCoursesPerReq = exports.getReqsPerCourse = exports.getOutOfMajorReqs = exports.getMajorsPerCourse = exports.closeDatabase = exports.fetchDataFromDatabase = exports.getMajorData = void 0;
var course_1 = require("./course");
//import {sqlite3} from 'sqlite3';
var sqlite3 = require('sqlite3');
// Open a connection to the SQLite database'
var db = new sqlite3.Database('./DatabaseDataEntry/courseDatabase.db');
function getMajorData(major) {
    return __awaiter(this, void 0, void 0, function () {
        var majorRequirements, outOfMajorReqs, majorReqMap, courseReqMap, reqFulfillingCourses, _a, _b, _c, totalCourses, possibleCoursesMap, prereqMap, output;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, getMajorRequirements(major)
                    //list of out of major reqs
                ];
                case 1:
                    majorRequirements = _d.sent();
                    return [4 /*yield*/, getOutOfMajorReqs(major)];
                case 2:
                    outOfMajorReqs = (_d.sent())[1];
                    majorReqMap = new Map();
                    return [4 /*yield*/, Promise.all(majorRequirements.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Promise.all(e.map(function (f) { return __awaiter(_this, void 0, void 0, function () { var _a, _b, _c; return __generator(this, function (_d) {
                                            switch (_d.label) {
                                                case 0:
                                                    _b = (_a = majorReqMap).set;
                                                    _c = [f];
                                                    return [4 /*yield*/, getCoursesPerReq(f)];
                                                case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                                            }
                                        }); }); }))];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))
                        //map of each course to the major requirement it fulfills
                    ];
                case 3:
                    _d.sent();
                    courseReqMap = new Map();
                    _b = (_a = Array).from;
                    _c = Set.bind;
                    return [4 /*yield*/, Promise.all(majorRequirements.map(function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, Promise.all(e.map(function (f) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, getCoursesPerReq(f)];
                                                case 1: return [2 /*return*/, _a.sent()];
                                            }
                                        }); }); }))];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }))];
                case 4:
                    reqFulfillingCourses = _b.apply(_a, [new (_c.apply(Set, [void 0, (_d.sent()).flat().flat().flat()]))()]);
                    return [4 /*yield*/, Promise.all(reqFulfillingCourses.map(function (course) { return __awaiter(_this, void 0, void 0, function () { var _a, _b, _c; return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _b = (_a = courseReqMap).set;
                                    _c = [course];
                                    return [4 /*yield*/, getReqsPerCourse(course)];
                                case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_d.sent()]))];
                            }
                        }); }); }))
                        //list of all courses with data
                    ];
                case 5:
                    _d.sent();
                    return [4 /*yield*/, getPrereqs(reqFulfillingCourses)];
                case 6:
                    totalCourses = _d.sent();
                    possibleCoursesMap = new Map();
                    return [4 /*yield*/, Promise.all(totalCourses.map(function (classString) { return __awaiter(_this, void 0, void 0, function () {
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
                                        possibleCoursesMap.set(classString, course);
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 7:
                    _d.sent();
                    prereqMap = new Map();
                    return [4 /*yield*/, Promise.all(totalCourses.map(function (course) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _b = (_a = prereqMap).set;
                                        _c = [course];
                                        return [4 /*yield*/, queryPrereqs(course)];
                                    case 1:
                                        _b.apply(_a, _c.concat([_d.sent()]));
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 8:
                    _d.sent();
                    output = { major: major, majorRequirements: majorRequirements, outOfMajorReqs: outOfMajorReqs, reqFulfillingCourses: reqFulfillingCourses, majorReqMap: majorReqMap, courseReqMap: courseReqMap, possibleCoursesMap: possibleCoursesMap, prereqMap: prereqMap };
                    return [2 /*return*/, output];
            }
        });
    });
}
exports.getMajorData = getMajorData;
function getPrereqs(courses) {
    return __awaiter(this, void 0, void 0, function () {
        var newCourses, processingCourses;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newCourses = [];
                    processingCourses = courses.slice();
                    return [4 /*yield*/, Promise.all(processingCourses.map(function (course) { return __awaiter(_this, void 0, void 0, function () {
                            var prereqs;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, queryPrereqs(course)];
                                    case 1:
                                        prereqs = _a.sent();
                                        return [4 /*yield*/, Promise.all(prereqs.map(function (e) { return e.split('||').forEach(function (f) {
                                                if (!processingCourses.includes(f) && !newCourses.includes(f)) {
                                                    newCourses.push(f);
                                                }
                                            }); }))];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    if (newCourses.length == 0) {
                        return [2 /*return*/, processingCourses];
                    }
                    else {
                        newCourses.forEach(function (e) { return processingCourses.push(e); });
                        return [2 /*return*/, getPrereqs(processingCourses)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Function to retrieve data from the database
function fetchDataFromDatabase(query) {
    return new Promise(function (resolve, reject) {
        db.all(query, [], function (err, rows) {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}
exports.fetchDataFromDatabase = fetchDataFromDatabase;
// Close the database connection
function closeDatabase() {
    db.close();
}
exports.closeDatabase = closeDatabase;
function parseEntireMajorJSONtoArr(jsonData) {
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
function parseCourseJSONtoArr(jsonData) {
    var layer = [];
    jsonData.forEach(function (e) {
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
    });
    return layer;
}
function parsePrereqJSONtoArr(jsonData) {
    var output = [];
    jsonData.forEach(function (e) {
        //console.log("Course: " + e.course + " prereq(s): " + e.prereq + "\n")
        output.push(e.prereq);
    });
    return output;
}
function parseMajorReqJSONtoArr(jsonData) {
    var specific = [];
    var general = [];
    jsonData.forEach(function (e) {
        for (var i = 0; i < e.numOfRequirements; i++) {
            e.specific ? specific.push(e.requirement) : general.push(e.requirement);
        }
    });
    return [specific, general];
}
function parseCoursesPerReqJSONtoArr(jsonData) {
    var output = [];
    jsonData.forEach(function (e) {
        output.push(e.course);
    });
    return output;
}
function parseReqsPerCourseJSONtoArr(jsonData) {
    var output = [];
    jsonData.forEach(function (e) {
        output.push(e.requirement);
    });
    return output;
}
function parseGetMajorsPerCourse(jsonData) {
    var output = [];
    jsonData.forEach(function (e) {
        if (!output.includes(e.major)) {
            output.push(e.major);
        }
    });
    return output;
}
function getMajorsPerCourse(course) {
    return __awaiter(this, void 0, void 0, function () {
        var query, majors;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT major FROM courses_per_req WHERE course = '" + course + "';";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    majors = _a.sent();
                    return [2 /*return*/, parseGetMajorsPerCourse(majors)];
            }
        });
    });
}
exports.getMajorsPerCourse = getMajorsPerCourse;
function getOutOfMajorReqs(major) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM major_req_table WHERE major = '" + major + "' AND outOfMajor = true;";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseMajorReqJSONtoArr(courses)];
            }
        });
    });
}
exports.getOutOfMajorReqs = getOutOfMajorReqs;
function getReqsPerCourse(course) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM courses_per_req WHERE course = '" + course + "';";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseReqsPerCourseJSONtoArr(courses)];
            }
        });
    });
}
exports.getReqsPerCourse = getReqsPerCourse;
function getCoursesPerReq(requirement) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM courses_per_req WHERE requirement = '" + requirement + "';";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseCoursesPerReqJSONtoArr(courses)];
            }
        });
    });
}
exports.getCoursesPerReq = getCoursesPerReq;
function getMajorRequirements(major) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM major_req_table WHERE major = '" + major + "';";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseMajorReqJSONtoArr(courses)];
            }
        });
    });
}
exports.getMajorRequirements = getMajorRequirements;
function queryPrereqs(course) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM prereq_table WHERE course = '" + course + "';";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parsePrereqJSONtoArr(courses)];
            }
        });
    });
}
exports.queryPrereqs = queryPrereqs;
function queryEntireMajor(major) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM course_table WHERE major = '" + major + "';";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseEntireMajorJSONtoArr(courses)];
            }
        });
    });
}
exports.queryEntireMajor = queryEntireMajor;
function queryCourse(course) {
    return __awaiter(this, void 0, void 0, function () {
        var query, courses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "SELECT * FROM course_table WHERE major || courseNumber = '" + course + "';";
                    return [4 /*yield*/, fetchDataFromDatabase(query)];
                case 1:
                    courses = _a.sent();
                    return [2 /*return*/, parseCourseJSONtoArr(courses)];
            }
        });
    });
}
exports.queryCourse = queryCourse;
