"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var _class = /** @class */ (function () {
    function _class(num, title, prereq) {
        this.major = this.major;
        this.num = num;
        this.prereq = prereq;
        this.fall = false;
        this.spring = false;
    }
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
readFile(filePath)
    .then(function (data) {
    parser(data);
})
    .catch(function (error) {
    console.error(error);
});
function node(data, rest) {
    return { isEmpty: function () { return false; }, head: function () { return data; }, tail: function () { return rest; } };
}
function empty() {
    return { isEmpty: function () { return true; }, head: function () { throw new Error(); }, tail: function () { throw new Error(); }
    };
}
function parser(data) {
    var textByLine = data.split("\n");
    console.log(textByLine);
}
//Elective here, click to insert 
//hashmap
