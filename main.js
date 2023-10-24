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
        var val = textByLine[i].split(',');
        var fall = val[3] === 'T';
        var spring = val[4] === 'T';
        var input = new class_1._class(val[0], Number(val[1]), val[2], fall, spring);
        console.log(input.toString());
        classList.push(input);
    }
    return classList;
}
var filePath = './Classes.txt';
readFile(filePath)
    .then(function (data) {
    parser(data);
})
    .catch(function (error) {
    console.error(error);
});
