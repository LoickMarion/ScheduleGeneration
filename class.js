"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._class = void 0;
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
exports._class = _class;
