"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppDistCacheDir = exports.getAppDistDir = exports.getAppSourceDir = void 0;
var path_1 = __importDefault(require("path"));
// import * as log from '@/utils/log';
var CWD = process.cwd();
// eg. 当前路径
var getAppSourceDir = function (appId) {
    return path_1.default.join(CWD, './', appId);
};
exports.getAppSourceDir = getAppSourceDir;
// eg. dist/simple-h5
var getAppDistDir = function (appId) {
    return path_1.default.join(CWD, './dist', appId);
};
exports.getAppDistDir = getAppDistDir;
// eg. /xxx/xxx/eris/.fecache/app/simple-h5
var getAppDistCacheDir = function (appId) {
    return path_1.default.join(CWD, '.fecache/app', appId);
};
exports.getAppDistCacheDir = getAppDistCacheDir;
