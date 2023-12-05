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
        var input = new course_1.Course(major, Number(number), prereqs, stringToBool(fall), stringToBool(spring), Number(credits));
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
var nodeMap = new Map();
classList.forEach(function (Course) { return nodeMap.set(Course.getMajor() + Course.getNumber(), new course_1.Node(Course, [])); });
var classStringList = [];
classList.forEach(function (Course) { return classStringList.push(Course.getMajor() + Course.getNumber()); });
//classList.forEach((Course) => classMap.set(Course.getMajor()+Course.getNumber(),Course));
var a = new course_1.Graph(nodeMap, classStringList, 16);
var b = a.getNodeMap();
var c = a.topoSort();
var d = a.makeSchedule();
//console.log(b.get("CS240"));
console.log(d);
