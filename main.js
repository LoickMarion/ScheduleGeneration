"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var course_1 = require("./course");
function readFileSync(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    }
    catch (err) {
        console.error("Error reading file:", err);
        return "";
    }
}
function data_to_course_map_parser(data) {
    var courseList = [];
    var textByLine = data.split("\n");
    for (var i = 0; i < textByLine.length; i++) {
        var _a = textByLine[i].split(','), major = _a[0], number = _a[1], prereq_string = _a[2], fall = _a[3], spring = _a[4], credits = _a[5];
        var prereqs = prereq_string.split('&&');
        var input = new course_1.course(major, Number(number), prereqs, stringToBool(fall), stringToBool(spring), Number(credits));
        courseList.push(input);
    }
    return courseList;
}
function stringToBool(s) {
    return (s === "T");
}
var filePath = './CS_Classes.txt';
var data = readFileSync(filePath);
var classList = data ? data_to_course_map_parser(data) : [];
var classMap = new Map();
classList.forEach(function (course) { return classMap.set(course.getMajor() + course.getNumber(), course); });
for (var elem in classList) {
    console.log(classList[elem]);
}
console.log(classMap.get("CS210"));
classList.forEach(function (course) { return console.log(course.toString()); });
