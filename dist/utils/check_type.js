"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkType = {};
function _isType(target, type) {
    return Object.prototype.toString.call(target) === "[object ".concat(type, "]");
}
[
    'String',
    'Boolean',
    'Number',
    'Array',
    'Function',
    'Object',
    'Date',
    'RegExp',
    'Error',
    'Null',
].forEach(function (type) {
    checkType["is".concat(type)] = function (target) { return _isType(target, type); };
});
exports.default = checkType;
