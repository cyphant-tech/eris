"use strict";
// A fork from:
// https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync/40686853#40686853
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function mkdirSync(targetDir, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.isRelativeToScript, isRelativeToScript = _c === void 0 ? false : _c;
    var sep = path_1.default.sep;
    var initDir = path_1.default.isAbsolute(targetDir) ? sep : '';
    var baseDir = isRelativeToScript ? __dirname : '.';
    return targetDir.split(sep).reduce(function (parentDir, childDir) {
        var curDir = path_1.default.resolve(baseDir, parentDir, childDir);
        try {
            fs_1.default.mkdirSync(curDir);
        }
        catch (err) {
            if (err.code === 'EEXIST') {
                // curDir already exists!
                return curDir;
            }
            // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
            if (err.code === 'ENOENT') {
                // Throw the original parentDir error on curDir `ENOENT` failure.
                throw new Error("EACCES: permission denied, mkdir '".concat(parentDir, "'"));
            }
            var caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
            if (!caughtErr || (caughtErr && curDir === path_1.default.resolve(targetDir))) {
                throw err; // Throw if it's just the last created dir.
            }
        }
        return curDir;
    }, initDir);
}
exports.default = mkdirSync;
