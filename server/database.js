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
exports.queryCourse = exports.queryPrereqs = exports.getMajorRequirements = exports.getCoursesPerReq = exports.getReqsPerCourse = exports.getOutOfMajorRecs = exports.getMajorsPerCourse = exports.closeDatabase = exports.fetchDataFromDatabase = void 0;
//import {sqlite3} from 'sqlite3';
var sqlite3 = require('sqlite3');
// Open a connection to the SQLite database
var db = new sqlite3.Database('./DatabaseDataEntry/courseDatabase.db');
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
function getOutOfMajorRecs(major) {
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
exports.getOutOfMajorRecs = getOutOfMajorRecs;
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
