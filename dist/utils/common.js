"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
/* eslint-disable no-prototype-builtins */
var check_type_1 = __importDefault(require("./check_type"));
function find(arrObj, key, val) {
    if (!check_type_1.default.isArray(arrObj))
        return;
    var result = [];
    arrObj.forEach(function (item) {
        if (item.hasOwnProperty(key) && item[key] === val) {
            result.push(item);
        }
    });
    return result;
}
exports.find = find;
