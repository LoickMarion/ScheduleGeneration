"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var class_1 = require("./class");
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
        var _a = textByLine[i].split(','), major = _a[0], number = _a[1], prereq = _a[2], fall = _a[3], spring = _a[4];
        var input = new class_1._class(major, Number(number), prereq, stringToBool(fall), stringToBool(spring));
        console.log(input.toString());
        classList.push(input);
    }
    return classList;
}
function stringToBool(s) {
    return (s === "T");
}
var filePath = './Classes.txt';
readFile(filePath)
    .then(function (data) {
    parser(data);
})
    .catch(function (error) {
    console.error(error);
});
