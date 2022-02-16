"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
/* eslint-disable no-async-promise-executor */
var path_1 = __importDefault(require("path"));
var del_1 = __importDefault(require("del"));
var ora_1 = __importDefault(require("ora"));
var inquirer_1 = __importDefault(require("inquirer"));
var git_clone_1 = __importDefault(require("@/utils/git_clone"));
var log = __importStar(require("@/utils/log"));
var compiler_1 = __importDefault(require("@/tasks/compiler"));
var prompt_1 = __importDefault(require("@/tasks/prompt"));
var exec_command_1 = __importDefault(require("@/tasks/exec_command"));
var print_create_success_1 = __importDefault(require("@/utils/print_create_success"));
function createAppFromGit(options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                    var appId, appName, gitRepo, dest, spinnerClone, tplConfig, tplAns, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                appId = options.appId;
                                appName = options.appName;
                                gitRepo = options.template;
                                dest = path_1.default.join(process.cwd(), './', appId);
                                spinnerClone = (0, ora_1.default)('cloneing...');
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 8, , 9]);
                                spinnerClone.start();
                                return [4 /*yield*/, (0, git_clone_1.default)(gitRepo, dest)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, (0, del_1.default)([path_1.default.join(dest, '.git')])];
                            case 3:
                                _a.sent();
                                log.logSuccess("\nclone template success in ".concat(dest));
                                spinnerClone.stop();
                                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(path_1.default.join(dest, './tpl.config.production.js'))); })];
                            case 4:
                                tplConfig = _a.sent();
                                if (!(tplConfig.options && tplConfig.options.length > 0)) return [3 /*break*/, 6];
                                return [4 /*yield*/, inquirer_1.default.prompt(tplConfig.options)];
                            case 5:
                                tplAns = _a.sent();
                                compilerInstance(dest, dest, {
                                    appId: appId,
                                    appName: appName,
                                    autoStart: tplConfig.autoStart,
                                    customParams: __assign({}, tplAns),
                                });
                                return [3 /*break*/, 7];
                            case 6:
                                resolve();
                                _a.label = 7;
                            case 7: return [3 /*break*/, 9];
                            case 8:
                                e_1 = _a.sent();
                                resolve(e_1);
                                return [3 /*break*/, 9];
                            case 9: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.default = createAppFromGit;
function compilerInstance(src, dest, options) {
    var spinner = (0, ora_1.default)('compiling...');
    // eslint-disable-next-line no-new
    new compiler_1.default({
        src: src,
        dest: dest,
        config: options,
        onStart: function () {
            spinner.start();
        },
        onDone: function () {
            return __awaiter(this, void 0, void 0, function () {
                var needStartAns;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            (0, print_create_success_1.default)(options.appId, options.appName);
                            // remove unuseful files
                            return [4 /*yield*/, (0, del_1.default)([path_1.default.join(dest, 'tpl.config.*')])];
                        case 1:
                            // remove unuseful files
                            _a.sent();
                            spinner.stop();
                            if (!options.autoStart) {
                                return [2 /*return*/, process.exit(0)];
                            }
                            return [4 /*yield*/, prompt_1.default.startApp()];
                        case 2:
                            needStartAns = _a.sent();
                            process.nextTick(function () {
                                if (needStartAns.needStart) {
                                    log.logInfo('如果启动失败，可尝试进入目标应用手动安装依赖修复');
                                    var appDir = path_1.default.join(process.cwd(), './', options.appId);
                                    (0, exec_command_1.default)(["cd ".concat(appDir), 'yarn start']);
                                }
                                else {
                                    process.exit(0);
                                }
                            });
                            return [2 /*return*/];
                    }
                });
            });
        },
    });
}
