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
var database_1 = require("./database");
var majorPriorityArrays = require("./DatabaseDataEntry/majorPriorityArrays.json");
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function testFunc() {
    return __awaiter(this, void 0, void 0, function () {
        var test, a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    test = ['CS', 'MATH'];
                    return [4 /*yield*/, completeSchedule(['CS589', 'CS383', 'MATH545'], test)];
                case 1:
                    a = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function expandUserInputViaPrereqs(courseList, coursesToAdd, masterList) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function () {
                        var course, splitCourse, shouldBreak, promises_1, prereqs;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    course = coursesToAdd.shift() //look at the first course we need to add
                                    ;
                                    splitCourse = course.split('||');
                                    shouldBreak = false;
                                    if (!(splitCourse.length > 1)) return [3 /*break*/, 3];
                                    if (!splitCourse.some(function (e) { return (courseList.includes(e) || coursesToAdd.includes(e)); })) return [3 /*break*/, 1];
                                    return [2 /*return*/, "continue"];
                                case 1:
                                    promises_1 = [];
                                    splitCourse.forEach(function (course) {
                                        var newCourseList = courseList.slice();
                                        var newCoursesToAdd = coursesToAdd.slice();
                                        newCoursesToAdd.push(course);
                                        var promise = new Promise(function (resolve, reject) {
                                            expandUserInputViaPrereqs(newCourseList, newCoursesToAdd, masterList)
                                                .then(function () {
                                                resolve(); // Resolve the promise when expandUserInputViaPrereqs completes
                                            })
                                                .catch(function (error) {
                                                reject(error); // Reject the promise if an error occurs
                                            });
                                        });
                                        promises_1.push(promise);
                                    });
                                    return [4 /*yield*/, Promise.all(promises_1)];
                                case 2:
                                    _b.sent();
                                    return [2 /*return*/, { value: void 0 }];
                                case 3:
                                    courseList.push(course); //add the course to list courses we have process
                                    return [4 /*yield*/, (0, database_1.queryPrereqs)(course)];
                                case 4:
                                    prereqs = _b.sent();
                                    prereqs.forEach(function (prereq) {
                                        if (!coursesToAdd.includes(prereq) && !courseList.includes(prereq)) {
                                            coursesToAdd.push(prereq);
                                        }
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (!(coursesToAdd.length > 0)) return [3 /*break*/, 3];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    return [3 /*break*/, 1];
                case 3:
                    //console.log(courseList)
                    masterList.push(courseList);
                    return [2 /*return*/];
            }
        });
    });
}
function completeSchedule(coursesSelectedInput, majors) {
    return __awaiter(this, void 0, void 0, function () {
        var coursesToTake, coursesSelected, majorRequirements, specific, general, _loop_2, _a, _b, _c, _i, current;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    coursesToTake = [];
                    coursesSelected = coursesSelectedInput.slice();
                    return [4 /*yield*/, Promise.all(majors.map(function (e) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, database_1.getMajorRequirements)(e)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 1:
                    majorRequirements = _d.sent();
                    specific = majorRequirements.map(function (e) { return e[0]; });
                    general = majorRequirements.map(function (e) { return e[1]; });
                    //loop through specifics. add to courses Selected to test so we can test them for other majors
                    specific.forEach(function (major) {
                        major.forEach(function (req) {
                            if (!coursesToTake.includes(req)) {
                                coursesToTake.push(req);
                            }
                            if (!coursesSelected.includes(req)) {
                                coursesSelected.push(req);
                            }
                        });
                    });
                    //const nonSpecificMajorRequirements = majorRequirements.filter()  
                    console.log(general);
                    _loop_2 = function (current) {
                        var requirementsSatisfied, filteredReqs;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    console.log(coursesSelected[current]);
                                    return [4 /*yield*/, (0, database_1.getReqsPerCourse)(coursesSelected[current])];
                                case 1:
                                    requirementsSatisfied = _e.sent();
                                    console.log(requirementsSatisfied);
                                    filteredReqs = requirementsSatisfied.filter(function (e) { return (general).some(function (e2) { return e2.includes(e); }); });
                                    console.log(filteredReqs);
                                    general.forEach(function (oneMajor) {
                                        var index = general.indexOf(oneMajor);
                                        var bestReq = pickBestReq(oneMajor, requirementsSatisfied, majors[index]);
                                        console.log(bestReq);
                                        if (oneMajor.indexOf(bestReq) >= 0) {
                                            oneMajor.splice(oneMajor.indexOf(bestReq), 1);
                                            //console.log('removing ' + bestReq + ' from major ' + majors[index] + ' from course ' + coursesSelected[current]);
                                        }
                                        ;
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _a = coursesSelected;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 4];
                    current = _c;
                    return [5 /*yield**/, _loop_2(current)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('after\n');
                    return [2 /*return*/];
            }
        });
    });
}
testFunc();
//one major is the requirements remaining for an individual major
//requirements satisfied are the requirements satisfied by a specific course
function pickBestReq(oneMajor, requirementsSatisfied, major) {
    var filteredReqs = requirementsSatisfied.filter(function (e) { return oneMajor.includes(e); });
    //console.log(filteredReqs)
    var curMajorPriority = majorPriorityArrays[major];
    for (var priority in curMajorPriority) {
        if (filteredReqs.includes(curMajorPriority[priority])) {
            return curMajorPriority[priority];
        }
    }
    return "None";
}
