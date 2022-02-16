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
/* eslint-disable no-async-promise-executor */
// import fs from 'fs';
var path_1 = __importDefault(require("path"));
var ejs_1 = __importDefault(require("ejs"));
var ora_1 = __importDefault(require("ora"));
var isPathExist_1 = __importDefault(require("@/utils/isPathExist"));
var log = __importStar(require("@/utils/log"));
var copy_async_1 = __importDefault(require("../utils/copy_async"));
var copy_file_async_1 = __importDefault(require("../utils/copy_file_async"));
var node_watch_1 = __importDefault(require("node-watch"));
var promise_delay_1 = __importDefault(require("@/utils/promise_delay"));
// const CWD = process.cwd();
var DevTpl = /** @class */ (function () {
    function DevTpl(options) {
        var _this = this;
        // 内置配置
        this.resolve = {
            // compile: include files
            extensions: [
                '.js',
                '.jsx',
                '.ts',
                '.tsx',
                '.ejs',
                '.less',
                '.css',
                '.scss',
                '.md',
                '.json',
            ],
            // copy: exclude files or folders
            exclude: [
                /node_modules/,
                /\.umi\/?$/,
                /\.git/,
                /yarn\.lock/,
                /package-lock\.json/,
            ],
        };
        this.configFileDir = path_1.default.join(process.cwd(), './templates');
        this.configFilePath = path_1.default.join(this.configFileDir, options.configFile);
        if (!(0, isPathExist_1.default)(this.configFilePath)) {
            log.logError("".concat(this.configFilePath, " is not exist"));
            return;
        }
        this.getConfig(this.configFilePath).then(function (ret) { return __awaiter(_this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.compileInitial(ret.src, ret.dest)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.log(e_1.toString());
                        return [3 /*break*/, 3];
                    case 3:
                        log.logInfo('DEV_TPL: first compile completed');
                        log.logInfo('DEV_TPL: waiting for changes...');
                        this.compileWatch();
                        return [2 /*return*/];
                }
            });
        }); });
    }
    DevTpl.prototype.getConfig = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, tplConfig, e_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    _a = this;
                                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(filePath)); })];
                                case 1:
                                    _a.tplConfig = _b.sent();
                                    tplConfig = this.tplConfig;
                                    this.src = path_1.default.resolve(this.configFileDir, tplConfig.baseUrl, tplConfig.name);
                                    this.dest = path_1.default.resolve(this.configFileDir, tplConfig.baseUrl, tplConfig.output, tplConfig.name);
                                    resolve({ src: this.src, dest: this.dest });
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_2 = _b.sent();
                                    reject(e_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * compileInitial - total compiler
     * @param src template source dir
     * @param dest template dest dir
     */
    DevTpl.prototype.compileInitial = function (src, dest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var e_3;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, (0, copy_async_1.default)(src, dest, {
                                            exclude: this.resolve.exclude,
                                            handler: function (file, content) {
                                                if (_this.resolve.extensions.includes(path_1.default.extname(file))) {
                                                    return _this.compileFileContent(content, _this.tplConfig.params);
                                                }
                                                return content;
                                            },
                                        })];
                                case 1:
                                    _a.sent();
                                    // 暂时无法准确获取 copyAsync 结束时间
                                    // hack copyAsync resolved 不准确
                                    (0, promise_delay_1.default)(1000).then(function () { return resolve(); });
                                    return [3 /*break*/, 3];
                                case 2:
                                    e_3 = _a.sent();
                                    resolve(e_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    // increment compiler
    // source file => dest file
    /**
     *
     * @param src source file
     * @param dest dest file
     */
    DevTpl.prototype.compileIncrement = function (src, dest) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        (0, copy_file_async_1.default)(src, dest, {
                            exclude: _this.resolve.exclude,
                            handler: function (file, content) {
                                if (_this.resolve.extensions.includes(path_1.default.extname(file))) {
                                    return _this.compileFileContent(content, _this.tplConfig.params);
                                }
                                return content;
                            },
                        });
                        resolve();
                    })];
            });
        });
    };
    DevTpl.prototype.compileWatch = function () {
        var _this = this;
        (0, node_watch_1.default)(path_1.default.join(this.configFileDir, this.tplConfig.name), {
            recursive: true,
            filter: function (f) { return !/node_modules|(\.umi$)/.test(f); },
            delay: 500,
        }, function (evt, name) { return __awaiter(_this, void 0, void 0, function () {
            var spinner, sourceFile, destFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        log.logInfo("".concat(name, " changed"));
                        spinner = (0, ora_1.default)('file compiling...');
                        sourceFile = name;
                        destFile = name.replace(this.tplConfig.name, 'dist/' + this.tplConfig.name);
                        return [4 /*yield*/, this.compileIncrement(sourceFile, destFile)];
                    case 1:
                        _a.sent();
                        spinner.stop();
                        log.logInfo('file compiled success');
                        log.logInfo('DEV_TPL: waiting for changes...');
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // 暂不支持自动启动，需要手动启动
    // startTpl() {}
    DevTpl.prototype.compileFileContent = function (tpl, data) {
        try {
            tpl = ejs_1.default.render(tpl, data);
        }
        catch (e) {
            console.log(tpl);
            log.logError(e.toString());
            return tpl;
        }
        return tpl;
    };
    return DevTpl;
}());
exports.default = DevTpl;
