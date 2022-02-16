"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var isPathExist_1 = __importDefault(require("./isPathExist"));
exports.default = (function (appId) {
    if ((0, isPathExist_1.default)(path_1.default.join(process.cwd(), './', appId))) {
        return false;
    }
    return true;
});
