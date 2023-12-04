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
exports.getCoursesData = void 0;
var fs = require("fs");
var course_1 = require("./course");
var sql = require("mssql");
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
var a = new course_1.Graph(nodeMap, classStringList);
var b = a.getNodeMap();
var config = {
    server: 'jm-lm-schedule.database.windows.net',
    database: 'jm-lm-schedule',
    authentication: {
        type: 'azure-active-directory-msi-app-service',
        options: {
            resource: 'https://database.windows.net/'
        }
    },
    options: {
        encrypt: true
    }
};
function getCoursesData() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, sql.connect(config)];
                case 1:
                    pool = _a.sent();
                    return [4 /*yield*/, pool.request().query('SELECT * FROM Courses')];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.recordset];
                case 3:
                    err_1 = _a.sent();
                    console.error('Database query error:', err_1);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getCoursesData = getCoursesData;
function fetchCoursesData() {
    return __awaiter(this, void 0, void 0, function () {
        var data_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getCoursesData()];
                case 1:
                    data_1 = _a.sent();
                    console.log('Retrieved Courses:', data_1); // Log the retrieved data
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error('Error fetching data:', err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
fetchCoursesData();
console.log(getCoursesData());
