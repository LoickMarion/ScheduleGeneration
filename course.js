"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.course = void 0;
var course = /** @class */ (function () {
    function course(major, number, prereqs, fall, spring, credits) {
        this.major = major;
        this.number = number;
        this.prereqs = prereqs;
        this.fall = fall;
        this.spring = spring;
        this.credits = credits;
    }
    course.prototype.getMajor = function () {
        return this.major;
    };
    course.prototype.getNumber = function () {
        return this.number;
    };
    course.prototype.getPrereq = function () {
        return this.prereqs;
    };
    course.prototype.getFall = function () {
        return this.fall;
    };
    course.prototype.getSpring = function () {
        return this.spring;
    };
    course.prototype.getCredits = function () {
        return this.credits;
    };
    course.prototype.toString = function () {
        var number = String(this.number);
        var fall = String(this.fall);
        var spring = String(this.spring);
        var credits = String(this.credits);
        return this.major + " " + number + " " + this.prereqs.toString() + " " + fall + " " + spring + " " + credits;
    };
    return course;
}());
exports.course = course;
var Node = /** @class */ (function () {
    function Node(data, courses_unlocked) {
        this.data = data;
        this.courses_unlocked = courses_unlocked;
    }
    Node.prototype.addAdjacent = function (node) {
        this.courses_unlocked.push(node);
    };
    return Node;
}());
exports.Node = Node;
