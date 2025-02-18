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
    //this was originallycalled toString
    Course.prototype.getAttributes = function () {
        var fall = String(this.fall);
        var spring = String(this.spring);
        var credits = String(this.credits);
        return this.major + " " + this.number + " " + this.prereqs.toString() + " " + fall + " " + spring + " " + credits;
    };
    //implemented this method to just get the id of course, eg CS220
    Course.prototype.toString = function () {
        return this.major + this.number;
    };
    Course.prototype.hasPrereq = function () {
        return this.getPrereq().length != 0;
    };
    return Course;
}());
exports.Course = Course;
var Node = /** @class */ (function () {
    function Node(data, coursesUnlocked) {
        this.data = data;
        this.coursesUnlocked = coursesUnlocked;
    }
    Node.prototype.getCourse = function () {
        return this.data;
    };
    Node.prototype.addAdjacent = function (course) {
        this.coursesUnlocked.push(course);
    };
    Node.prototype.getAdjacent = function () {
        return this.coursesUnlocked;
    };
    return Node;
}());
exports.Node = Node;
var Graph = /** @class */ (function () {
    function Graph(nodeMap, courseList, creditLimit) {
        //this.node_list = node_list;
        this.nodeMap = nodeMap;
        this.courseList = courseList;
        this.creditLimit = creditLimit;
        this.numCoursesUnlockedMap = new Map;
        this.addPrereqLinks();
        this.sortedClasses = this.topoSort();
    }
    Graph.prototype.topoSort = function () {
        var _this = this;
        var finalList = []; //final returned list of sorted classes
        var workingList = []; //tsc
        var incomingEdgeDict = new Map();
        //initalize each node with 0 incoming edges.
        this.courseList.forEach(function (course) {
            var _a, _b;
            incomingEdgeDict.set(course.toString(), 0);
            var numAdjacent = (_b = (_a = _this.nodeMap.get(course).getAdjacent()) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
            _this.numCoursesUnlockedMap.set(course.toString(), numAdjacent);
        });
        //update incoming edge dict  to have number of  edges unlocking each node. logic is that when this is 0, a course will be eligible to be taken. 
        this.courseList.forEach(function (course) {
            _this.nodeMap.get(course).getAdjacent().forEach(function (courseName) {
                // Check if the key exists in the incomingEdgeDict
                var pleaseWork = incomingEdgeDict.get(courseName);
                incomingEdgeDict.set(courseName, pleaseWork + 1);
                var num = String(pleaseWork + 1);
            });
        });
        //add courses with no incoming edges to workingList.
        this.courseList.forEach(function (course) {
            if (incomingEdgeDict.get(course) == 0) {
                workingList.push(course.toString());
            }
        });
        while (workingList.length > 0) {
            //take the first element of workingList and add it to finalList
            var course = workingList.shift();
            if (course) {
                finalList.push(course);
                //add all nodes with one remianing prereq adjacent to this node ( 0 after processing this) to the working list. remove 1 from remainging edges map
                this.nodeMap.get(course).getAdjacent().forEach(function (courseName) {
                    if (incomingEdgeDict.get(courseName) == 1) {
                        workingList.push(courseName);
                    }
                    var pleaseWork = incomingEdgeDict.get(courseName);
                    incomingEdgeDict.set(courseName, pleaseWork - 1);
                });
            }
        }
        return finalList;
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
    Graph.prototype.enoughSpace = function (course, creditsInSem) {
        return this.nodeMap.get(course).getCourse().getCredits() + creditsInSem <= this.creditLimit;
    };
    Graph.prototype.prereqsSatisfied = function (course, coursesTaken) {
        var coursePrereqs = this.nodeMap.get(course).getCourse().getPrereq();
        if (coursePrereqs.length === 0) {
            return true;
        }
        return coursePrereqs.every(function (curr) {
            var parsed = curr.split('||');
            var a = parsed.some(function (e) { return coursesTaken.includes(e); });
            return a;
        });
    };
    Graph.prototype.makeSchedule = function () {
        var _this = this;
        var schedule = [];
        var classesToAdd = this.topoSort();
        var coursesTaken = [];
        while (classesToAdd.length > 0) {
            var creditsInSem = 0;
            var coursesEligibleToTake = [];
            var coursesInSem = [];
            for (var i = 0; i < classesToAdd.length && this.prereqsSatisfied(classesToAdd[i], coursesTaken); i++) {
                coursesEligibleToTake.push(classesToAdd[i]);
            }
            coursesEligibleToTake.sort(function (a, b) { return _this.numCoursesUnlockedMap.get(b) - _this.numCoursesUnlockedMap.get(a); });
            //console.log(coursesEligibleToTake);
            for (var _i = 0, coursesEligibleToTake_1 = coursesEligibleToTake; _i < coursesEligibleToTake_1.length; _i++) {
                var course = coursesEligibleToTake_1[_i];
                if (this.enoughSpace(course, creditsInSem)) {
                    creditsInSem += this.nodeMap.get(course).getCourse().getCredits();
                    coursesInSem.push(course);
                    classesToAdd.splice(classesToAdd.indexOf(course), 1);
                }
            }
            coursesInSem.forEach(function (course) { return coursesTaken.push(course); });
            schedule.push(coursesInSem);
        }
        //console.log(schedule);
        return schedule;
    };
    return Graph;
}());
exports.Graph = Graph;
