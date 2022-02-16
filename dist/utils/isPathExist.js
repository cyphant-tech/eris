"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function isPathExist(path) {
    try {
        fs_1.default.accessSync(path, fs_1.default.constants.F_OK);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.default = isPathExist;
