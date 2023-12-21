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
        var number = String(this.number);
        var fall = String(this.fall);
        var spring = String(this.spring);
        var credits = String(this.credits);
        return this.major + " " + number + " " + this.prereqs.toString() + " " + fall + " " + spring + " " + credits;
    };
    //implemented this method to just get the id of course, eg CS220
    Course.prototype.toString = function () {
        var number = String(this.number);
        return this.major + number;
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
        this.addPrereqLinks();
        this.sortedClasses = this.topoSort();
    }
    Graph.prototype.topoSort = function () {
        var _this = this;
        var finalList = [];
        var workingList = [];
        var incomingEdgeDict = new Map();
        //initalize each node iwth 0 incoming edges.
        this.courseList.forEach(function (course) { return incomingEdgeDict.set(course.toString(), 0); });
        //update incoming edge dict  to have number of  edges unlocking each node. logic is that when this is 0, a course will be eligible to be taken. 
        //This wont hold up long term but because wont work if you have to take course A and course B or course C, bc it iwll let you take jsut B and C, but
        //good rudimentary model ig
        this.courseList.forEach(function (course) {
            _this.nodeMap.get(course).getAdjacent().forEach(function (courseName) {
                // Check if the key exists in the incomingEdgeDict
                var pleaseWork = incomingEdgeDict.get(courseName);
                incomingEdgeDict.set(courseName, pleaseWork + 1);
                var num = String(pleaseWork + 1);
                //console.log(courseName + "now has" + num + "edges")
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
        console.log(coursePrereqs);
        if (coursePrereqs.length === 0) {
            return true;
        }
        //if(!this.nodeMap.get(course)!.hasPrereq()){ return true; } 
        return coursePrereqs.every(function (curr) { return coursesTaken.includes(curr); });
    };
    Graph.prototype.makeSchedule = function () {
        var schedule = [];
        var classesToAdd = this.sortedClasses;
        var coursesTaken = [];
        while (classesToAdd.length > 0) {
            var creditsInSem = 0;
            var coursesInSem = [];
            var i = 0;
            while (i < classesToAdd.length && this.prereqsSatisfied(classesToAdd[i], coursesTaken)) {
                console.log("adding class: " + classesToAdd[i] + '\n' + "courses taken: " + coursesTaken + '\n' + "prereqs satisfied: " + this.prereqsSatisfied(classesToAdd[i], coursesTaken) + '\n' + '\n' + '\n');
                if (this.enoughSpace(classesToAdd[0], creditsInSem)) {
                    creditsInSem += this.nodeMap.get(classesToAdd[i]).getCourse().getCredits();
                    coursesInSem.push(classesToAdd[i]);
                    classesToAdd.splice(i, 1);
                    i--;
                }
                //coursesInSem.forEach((course)=>coursesTaken.push(course))
                i++;
            }
            coursesInSem.forEach(function (course) { return coursesTaken.push(course); });
            schedule.push(coursesInSem);
        }
        return schedule;
    };
    return Graph;
}());
exports.Graph = Graph;
