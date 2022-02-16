"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.getProjectConfig = exports.getAppPath = void 0;
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var exec_command_1 = __importDefault(require("@/tasks/exec_command"));
var isPathExist_1 = __importDefault(require("@/utils/isPathExist"));
var log = __importStar(require("@/utils/log"));
var simple_git_1 = __importDefault(require("simple-git"));
function getAppPath(appId) {
    return path_1.default.join(process.cwd(), './', appId);
}
exports.getAppPath = getAppPath;
function getAppPkgScripts(appPath) {
    if (!(0, isPathExist_1.default)(appPath)) {
        log.logError("\u627E\u4E0D\u5230 ".concat(appPath));
        process.exit(0);
    }
    var pkgJSON = require(path_1.default.join(appPath, 'package.json'));
    if (pkgJSON && pkgJSON.scripts) {
        return pkgJSON.scripts;
    }
    return {};
}
function getProjectConfig(appId) {
    return __awaiter(this, void 0, void 0, function () {
        var configPath, content, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    configPath = path_1.default.resolve(getAppPath(appId), 'project.json');
                    content = null;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fs_1.promises.readFile(configPath, 'utf8')];
                case 2:
                    content = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = _b.sent();
                    // file is not exist
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/, JSON.parse(content)];
            }
        });
    });
}
exports.getProjectConfig = getProjectConfig;
var Project = /** @class */ (function () {
    function Project(appId) {
        this.appId = appId;
        this.appRootPath = getAppPath(appId);
    }
    Project.prototype.build = function (env) {
        return __awaiter(this, void 0, void 0, function () {
            var buildCommand;
            return __generator(this, function (_a) {
                buildCommand = 'yarn build';
                if (env && getAppPkgScripts(this.appRootPath)["build:".concat(env)]) {
                    buildCommand = "yarn build:".concat(env);
                }
                return [2 /*return*/, (0, exec_command_1.default)(["cd ".concat(getAppPath(this.appId)), buildCommand])];
            });
        });
    };
    Project.prototype.deployToTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, git, current, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        log.logInfo('开始构建');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.build('testing')];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _c.sent();
                        log.logError('构建失败');
                        return [2 /*return*/];
                    case 4:
                        git = (0, simple_git_1.default)({
                            baseDir: process.cwd(),
                        });
                        return [4 /*yield*/, git.branch()];
                    case 5:
                        current = (_c.sent()).current;
                        log.logInfo("\u5F53\u524D\u5206\u652F\u662F ".concat(current));
                        return [4 /*yield*/, git.add('.')];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, git.commit('chore: update build')];
                    case 7:
                        _c.sent();
                        log.logInfo('推送到remote......');
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, git.push('origin', current)];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        _b = _c.sent();
                        log.logError('push 到远程仓库失败');
                        return [2 /*return*/];
                    case 11:
                        log.logInfo('创建pipeline');
                        return [2 /*return*/];
                }
            });
        });
    };
    return Project;
}());
exports.Project = Project;
