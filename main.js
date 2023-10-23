"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _class = /** @class */ (function () {
    function _class(major, num, prereq, fall, spring) {
        this.major = major;
        this.num = num;
        this.prereq = prereq;
        this.fall = fall;
        this.spring = spring;
    }
    _class.prototype.getMajor = function () {
        return this.major;
    };
    _class.prototype.getNum = function () {
        return this.num;
    };
    _class.prototype.getPrereq = function () {
        return this.prereq;
    };
    _class.prototype.getFall = function () {
        return this.fall;
    };
    _class.prototype.getSpring = function () {
        return this.spring;
    };
    _class.prototype.toString = function () {
        var num = String(this.num);
        var fall = String(this.fall);
        var spring = String(this.spring);
        return this.major + " " + num + " " + this.prereq + " " + fall + " " + spring;
    };
    return _class;
}());
var filePath = './Classes.txt';
function readFile(filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
function parser(data) {
    var textByLine = data.split("\n");
    var classList = [];
    for (var i = 0; i < textByLine.length; i++) {
        var val = textByLine[i].split(',');
        var fall = val[3] === 'T';
        var spring = val[4] === 'T';
        var input = new _class(val[0], Number(val[1]), val[2], fall, spring);
        console.log(input.toString());
        classList.push(input);
    }
    return classList;
}
readFile(filePath)
    .then(function (data) {
    parser(data);
})
    .catch(function (error) {
    console.error(error);
});
//Elective here, click to insert 
//hashmap
