"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = exports.Node = exports.Course = void 0;
var Course = /** @class */ (function () {
    function Course(major, number, prereqs, fall, spring, credits) {
        this.major = major;
        this.number = number;
        this.prereqs = prereqs;
        this.fall = fall;
        this.spring = spring;
        this.credits = credits;
    }
    Course.prototype.getMajor = function () {
        return this.major;
    };
    Course.prototype.getNumber = function () {
        return this.number;
    };
    Course.prototype.getPrereq = function () {
        return this.prereqs;
    };
    Course.prototype.getFall = function () {
        return this.fall;
    };
    Course.prototype.getSpring = function () {
        return this.spring;
    };
    Course.prototype.getCredits = function () {
        return this.credits;
    };
    Course.prototype.toString = function () {
        var number = String(this.number);
        var fall = String(this.fall);
        var spring = String(this.spring);
        var credits = String(this.credits);
        return this.major + " " + number + " " + this.prereqs.toString() + " " + fall + " " + spring + " " + credits;
    };
    Course.prototype.hasPrereq = function () {
        return this.getPrereq().length != 0;
    };
    return Course;
}());
exports.Course = Course;
var Node = /** @class */ (function () {
    function Node(data, Courses_unlocked) {
        this.data = data;
        this.Courses_unlocked = Courses_unlocked;
    }
    Node.prototype.getCourse = function () {
        return this.data;
    };
    Node.prototype.addAdjacent = function (course) {
        this.Courses_unlocked.push(course);
    };
    return Node;
}());
exports.Node = Node;
var Graph = /** @class */ (function () {
    function Graph(nodeMap, courseList) {
        //this.node_list = node_list;
        this.nodeMap = nodeMap;
        this.courseList = courseList;
        this.addPrereqLinks();
    }
    Graph.prototype.makeSchedule = function () {
        return "a finished project! Thank you I'll take the paid internship.";
    };
    Graph.prototype.addPrereqLinks = function () {
        for (var _i = 0, _a = this.courseList; _i < _a.length; _i++) {
            var course = _a[_i];
            var node = this.nodeMap.get(course);
            if (node !== undefined) {
                var list = node.getCourse().getPrereq();
                for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                    var prereq = list_1[_b];
                    var prereqNode = this.nodeMap.get(prereq);
                    if (prereqNode !== undefined) {
                        prereqNode.addAdjacent(course);
                        this.nodeMap.set(prereq, prereqNode);
                    }
                }
            }
        }
    };
    Graph.prototype.getNodeMap = function () {
        return this.nodeMap;
    };
    return Graph;
}());
exports.Graph = Graph;
