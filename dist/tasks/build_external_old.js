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
var path_1 = __importDefault(require("path"));
var ora_1 = __importDefault(require("ora"));
var isPathExist_1 = __importDefault(require("@/utils/isPathExist"));
var log = __importStar(require("@/utils/log"));
// import * as styles from '@/utils/style';
var appinfo_1 = require("@/utils/appinfo");
var copy_async_1 = __importDefault(require("@/utils/copy_async"));
var promise_delay_1 = __importDefault(require("@/utils/promise_delay"));
var rmdirs_1 = __importDefault(require("@/utils/rmdirs"));
var CWD = process.cwd();
var ONLY_COPY_FILES = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.ttf',
    '.eot',
    '.otf',
    '.woff',
    '.svf',
    '.mp3',
    '.mp4',
    '.avi',
    '.pdf',
    '.apk',
];
function default_1(options) {
    return __awaiter(this, void 0, void 0, function () {
        var appId, target, buildEnv, spinner, hybridTplConfig, externalPath, sourcePath, targetPath, e_1, appPath, erisrcPath, configInfo, externalPath, sourcePath, targetPath, e_2, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appId = options.appId;
                    target = options.target;
                    buildEnv = options.buildEnv;
                    checkApp(appId);
                    checkTarget(target);
                    log.logSuccess("".concat(appId, " \u6784\u5EFA\u5B8C\u6210\uFF0C\u5F00\u59CB\u6253\u5305\u5916\u90E8\u5E94\u7528"));
                    spinner = (0, ora_1.default)('文件处理中...');
                    spinner.start();
                    if (!(target === 'tpl')) return [3 /*break*/, 7];
                    hybridTplConfig = options.config.templates.app.find(function (item) {
                        return item.name === 'app-template-hybrid';
                    });
                    externalPath = hybridTplConfig.external.path;
                    sourcePath = path_1.default.join(CWD, './www/dist/hybrid', appId);
                    targetPath = path_1.default.join(CWD, '../', externalPath);
                    if (!(0, isPathExist_1.default)(targetPath)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, rmdirs_1.default)(targetPath)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, copy_async_1.default)(sourcePath, targetPath, {
                            onlyCopy: ONLY_COPY_FILES,
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log('\n');
                    log.logError('copyToTarget');
                    process.exit(0);
                    return [3 /*break*/, 5];
                case 5: return [4 /*yield*/, (0, promise_delay_1.default)(500)];
                case 6:
                    _a.sent();
                    spinner.stop();
                    log.logSuccess("".concat(appId, " \u5DF2\u6210\u529F\u6253\u5305\u5230 ").concat(target, " \u4E2D"));
                    log.logSuccess("".concat(appId, " \u5728 ").concat(target, " \u4E2D\u7684\u4F4D\u7F6E\uFF1A").concat(targetPath));
                    return [3 /*break*/, 22];
                case 7:
                    if (!(target === 'atlas')) return [3 /*break*/, 22];
                    appPath = path_1.default.join(CWD, 'fe/app', appId);
                    erisrcPath = path_1.default.join(appPath, '/.erisrc.js');
                    if (!(0, isPathExist_1.default)(erisrcPath)) return [3 /*break*/, 15];
                    _a.label = 8;
                case 8:
                    _a.trys.push([8, 13, , 14]);
                    return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(erisrcPath)); })];
                case 9:
                    configInfo = _a.sent();
                    externalPath = configInfo.externalOutputpath;
                    sourcePath = path_1.default.join(CWD, './www/dist/hybrid', appId);
                    targetPath = path_1.default.join(CWD, '../', externalPath);
                    if (!(0, isPathExist_1.default)(targetPath)) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, rmdirs_1.default)(targetPath)];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [4 /*yield*/, (0, copy_async_1.default)(sourcePath, targetPath, {
                        onlyCopy: ONLY_COPY_FILES,
                    })];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 14];
                case 13:
                    e_2 = _a.sent();
                    console.log('\n');
                    log.logError('copyToTarget');
                    console.log('\n');
                    console.log(e_2);
                    process.exit(0);
                    return [3 /*break*/, 14];
                case 14: return [3 /*break*/, 21];
                case 15:
                    _a.trys.push([15, 20, , 21]);
                    return [4 /*yield*/, compileAndGenerateCacheFiles(appId, target, buildEnv)];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, (0, promise_delay_1.default)(500)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, copyToTarget(appId, target)];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, (0, promise_delay_1.default)(500)];
                case 19:
                    _a.sent();
                    return [3 /*break*/, 21];
                case 20:
                    e_3 = _a.sent();
                    console.log(e_3.toString());
                    process.exit(0);
                    return [3 /*break*/, 21];
                case 21:
                    spinner.stop();
                    log.logSuccess("".concat(appId, " \u7684\u9759\u6001\u6587\u4EF6\u5DF2\u6210\u529F copy \u5230 ").concat(target, " \u4E2D"));
                    log.logSuccess("".concat(appId, " \u5728 ").concat(target, " \u4E2D\u7684\u4F4D\u7F6E\uFF1A").concat((0, appinfo_1.getExternalDistDir)(appId, target)));
                    buildEnv === 'test' ? printBuildTestInfo() : printBuildProdInfo();
                    _a.label = 22;
                case 22: return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
function printBuildTestInfo() {
    log.logWarning('测试环境打包可在本地或测试机直接访问');
}
function printBuildProdInfo() {
    log.logWarning('为确保正常访问，还需要上传静态文件到 CDN');
    log.logWarning('1. 请到 swan 中克隆 atlas 项目（如果已克隆可忽略）');
    log.logWarning('2. 进入 atlas 根目录执行命令 sh ./bin/deploy.sh [appId]');
    log.logWarning('例如：sh ./bin/deploy.sh simple-h5');
}
function checkApp(appId) {
    if (!(0, isPathExist_1.default)((0, appinfo_1.getAppSourceDir)(appId))) {
        log.logError("".concat(appId, " \u4E0D\u5B58\u5728"));
        process.exit(0);
        return false;
    }
    return true;
}
// STEP1: check target
function checkTarget(target) {
    if (!(0, isPathExist_1.default)((0, appinfo_1.getExternalDir)(target))) {
        log.logError("eris \u7684\u540C\u7EA7\u76EE\u5F55\u4E2D\u4E0D\u5B58\u5728 ".concat(target, " \u9879\u76EE\uFF0C\u8BF7\u786E\u4FDD ").concat(target, " \u548C eris \u5728\u540C\u4E00\u4E2A\u5DE5\u4F5C\u7A7A\u95F4"));
        process.exit(0);
        return false;
    }
    return true;
}
// STEP2: Compiler html, replace url
// src="/dist/app/simple-h5/umi.c30a7717.js"
// href="/dist/app/simple-h5/umi.f7aa79f3.css"
// =======>
// src="//static.yidianzixun.com/modules/build/atlas/app/simple-h5/umi.c30a7717.js"
// href="//static.yidianzixun.com/modules/build/atlas/app/simple-h5/umi.f7aa79f3.css"
function compileAndGenerateCacheFiles(appId, target, buildEnv) {
    return __awaiter(this, void 0, void 0, function () {
        var appDistDir, reg, targetEnv, publicPath, distCacheDir, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appDistDir = (0, appinfo_1.getAppDistDir)(appId);
                    reg = new RegExp("/dist/app/".concat(appId, "/"), 'g');
                    targetEnv = "".concat(target, "-").concat(buildEnv);
                    publicPath = '';
                    switch (targetEnv) {
                        case 'atlas-test':
                            publicPath = "/public/app/".concat(appId, "/");
                            break;
                        case 'atlas-prod':
                            publicPath = "//static.yidianzixun.com/modules/build/atlas/app/".concat(appId, "/");
                            break;
                    }
                    distCacheDir = (0, appinfo_1.getAppDistCacheDir)(appId);
                    if (!(0, isPathExist_1.default)(distCacheDir)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, rmdirs_1.default)(distCacheDir)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, copy_async_1.default)(appDistDir, distCacheDir, {
                            onlyCopy: ONLY_COPY_FILES,
                            handler: function (file, content) {
                                if (['.html', '.js', '.css'].includes(path_1.default.extname(file))) {
                                    content = content.replace(reg, publicPath);
                                }
                                return content;
                            },
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_4 = _a.sent();
                    console.log('\n');
                    log.logError('compileAndGenerateCacheFiles');
                    throw e_4;
                case 5: return [2 /*return*/];
            }
        });
    });
}
// STEP3: copy to target
function copyToTarget(appId, target) {
    return __awaiter(this, void 0, void 0, function () {
        var targetDistDir, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    targetDistDir = (0, appinfo_1.getExternalDistDir)(appId, target);
                    if (!(0, isPathExist_1.default)(targetDistDir)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, rmdirs_1.default)(targetDistDir)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, copy_async_1.default)((0, appinfo_1.getAppDistCacheDir)(appId), targetDistDir, {
                            onlyCopy: ONLY_COPY_FILES,
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_5 = _a.sent();
                    console.log('\n');
                    log.logError('copyToTarget');
                    throw e_5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
