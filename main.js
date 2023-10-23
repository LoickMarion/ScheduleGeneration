"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Instance = /** @class */ (function () {
    function Instance(num, title, prereq) {
        this.major = this.major;
        this.num = num;
        this.prereq = prereq;
        this.fall = false;
        this.spring = false;
    }
    return Instance;
}());
function node(data, rest) {
    return { isEmpty: function () { return false; }, head: function () { return data; }, tail: function () { return rest; } };
}
function empty() {
    return { isEmpty: function () { return true; }, head: function () { throw new Error(); }, tail: function () { throw new Error(); }
    };
}
console.log("hi");
//Elective here, click to insert 
//hashmap
