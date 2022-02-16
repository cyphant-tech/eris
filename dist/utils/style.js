"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yellowBold = exports.yellow = exports.greenBold = exports.green = exports.redBold = exports.red = exports.error = exports.warning = exports.success = exports.info = void 0;
var chalk_1 = __importDefault(require("chalk"));
// info: blue
// success: green
// warning: yellow
// error: red
function info(text) {
    return chalk_1.default.blue(text);
}
exports.info = info;
function success(text) {
    return chalk_1.default.green(text);
}
exports.success = success;
function warning(text) {
    return chalk_1.default.yellow(text);
}
exports.warning = warning;
function error(text) {
    return chalk_1.default.red(text);
}
exports.error = error;
function red(text) {
    return chalk_1.default.red(text);
}
exports.red = red;
function redBold(text) {
    return chalk_1.default.red.bold(text);
}
exports.redBold = redBold;
function green(text) {
    return chalk_1.default.green(text);
}
exports.green = green;
function greenBold(text) {
    return chalk_1.default.green.bold(text);
}
exports.greenBold = greenBold;
function yellow(text) {
    return chalk_1.default.yellow(text);
}
exports.yellow = yellow;
function yellowBold(text) {
    return chalk_1.default.yellow.bold(text);
}
exports.yellowBold = yellowBold;
