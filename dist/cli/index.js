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
require('../../helpers/module-alias')({
    base: path_1.default.join(__dirname, '../../'),
});
var isPathExist_1 = __importDefault(require("@/utils/isPathExist"));
var commander_1 = __importDefault(require("commander"));
var style = __importStar(require("@/utils/style"));
var log = __importStar(require("@/utils/log"));
var verify_template_1 = __importDefault(require("@/utils/verify_template"));
var help_examples_1 = __importDefault(require("./help_examples"));
var prompt_1 = __importDefault(require("@/tasks/prompt"));
var create_app_1 = __importDefault(require("@/tasks/create_app"));
var create_app_from_git_1 = __importDefault(require("@/tasks/create_app_from_git"));
var verify_app_1 = __importDefault(require("@/utils/verify_app"));
var one_step_1 = __importDefault(require("@/tasks/one_step"));
var welcome_1 = __importDefault(require("@/utils/welcome"));
var devtpl_1 = __importDefault(require("@/devtools/devtpl"));
var start_app_1 = __importDefault(require("@/tasks/start_app"));
var delete_app_1 = __importDefault(require("@/tasks/delete_app"));
var installDeps_1 = __importDefault(require("@/utils/installDeps"));
var options_1 = require("@/internal/options");
var project_1 = require("@/internal/project");
var set_app_id_1 = require("@/tasks/set_app_id");
var CWD = process.cwd();
function checkVersion() {
    // v10.12.0++
    var suggestVersion = '10.12.0';
    var nodeVersion = process.versions.node;
    if (parseInt(nodeVersion.split('.')[0]) < parseInt(suggestVersion.split('.')[0])) {
        log.logInfo("\u5F53\u524D Node \u7248\u672C\uFF1Av".concat(nodeVersion));
        log.logInfo("\u5EFA\u8BAE Node \u7248\u672C\uFF1Av".concat(suggestVersion, "++"));
        log.logWarning('Node 版本过低可能会导致脚手架无法运行');
    }
}
exports.default = (function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var isActionActivated, ans, appPath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                checkVersion();
                isActionActivated = false;
                commander_1.default.name('eris').version(config.version).usage('[command] [options]');
                // 创建应用
                // eris create my-app --app-title 'My App' --template app-template-h5
                commander_1.default
                    .command('create [appId]')
                    .description('create an application')
                    .option('--app-name <appName>', 'What is your app name')
                    .option('--template <templateName>', 'Which template to use')
                    .action(function (appId, options) { return __awaiter(void 0, void 0, void 0, function () {
                    var createType, appName, template, fromGit, tplConfig, appNameAns, tplAns, tplAns, _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                // target:
                                // 例如：
                                // create my-app 会创建一个以 my-app 命名的应用
                                isActionActivated = true;
                                if (!appId) {
                                    log.logError(style.redBold('[appId] 未填写'));
                                    process.exit(1);
                                }
                                // 兼容旧版写法，自动替换为 -
                                appId = appId.replace(/:/, '-');
                                createType = 'app';
                                appName = '';
                                template = '';
                                fromGit = false;
                                tplConfig = {};
                                if (!(0, verify_app_1.default)(appId)) {
                                    log.logError("".concat(style.red('应用ID不合法或者重复，换一个试试')));
                                    process.exit(0);
                                }
                                if (!options.appName) return [3 /*break*/, 1];
                                appName = options.appName;
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, prompt_1.default.appName(appId)];
                            case 2:
                                appNameAns = _c.sent();
                                appName = appNameAns.appName;
                                _c.label = 3;
                            case 3:
                                if (!options.template) return [3 /*break*/, 6];
                                // using template from a git repository
                                if (/^(https?:\/\/).+(\.git)$/.test(options.template)) {
                                    fromGit = true;
                                }
                                else if (!(0, verify_template_1.default)(createType, options.template, config.templates[createType])) {
                                    log.logError("".concat(style.greenBold(createType), " \u4E2D\u672A\u5305\u542B\u540D\u79F0\u4E3A ").concat(style.redBold(options.template), " \u7684\u6A21\u677F\uFF0C\u8BF7\u91CD\u65B0\u8FD0\u884C"));
                                    process.exit(1);
                                }
                                template = options.template;
                                if (!!fromGit) return [3 /*break*/, 5];
                                return [4 /*yield*/, prompt_1.default.template(config.templates[createType], template)];
                            case 4:
                                tplAns = _c.sent();
                                tplConfig = tplAns.tplConfig;
                                _c.label = 5;
                            case 5: return [3 /*break*/, 8];
                            case 6: return [4 /*yield*/, prompt_1.default.template(config.templates[createType])];
                            case 7:
                                tplAns = _c.sent();
                                template = tplAns.template;
                                tplConfig = tplAns.tplConfig || {};
                                _c.label = 8;
                            case 8:
                                _a = createType;
                                switch (_a) {
                                    case 'app': return [3 /*break*/, 9];
                                }
                                return [3 /*break*/, 13];
                            case 9:
                                if (!fromGit) return [3 /*break*/, 11];
                                return [4 /*yield*/, (0, create_app_from_git_1.default)({ appId: appId, appName: appName, template: template, fromGit: fromGit })];
                            case 10:
                                _b = _c.sent();
                                return [3 /*break*/, 12];
                            case 11:
                                _b = (0, create_app_1.default)({ appId: appId, appName: appName, template: template, tplConfig: tplConfig });
                                _c.label = 12;
                            case 12:
                                _b;
                                return [3 /*break*/, 14];
                            case 13:
                                console.log('ERROR');
                                process.exit(1);
                                _c.label = 14;
                            case 14: return [2 /*return*/];
                        }
                    });
                }); });
                // install 不加参数，相当于 cd fe，然后执行 yarn，更新工作区依赖
                // install [appId] 进入某个应用安装依赖
                commander_1.default
                    .command('install [appId]')
                    .description('install node modules in your app, eg. yarn eris install my-app')
                    .action(function (appId) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, appPath;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isActionActivated = true;
                                _a = appId;
                                if (_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, set_app_id_1.getDefaultAppId)()];
                            case 1:
                                _a = (_b.sent());
                                _b.label = 2;
                            case 2:
                                appId = _a;
                                // 不指定 appid，在 yarn workspace 安装
                                if (!appId) {
                                    appPath = path_1.default.join(CWD, './');
                                    if (!(0, isPathExist_1.default)(path_1.default.join(appPath, 'package.json'))) {
                                        log.logError("".concat(style.redBold(appPath), " \u76EE\u5F55\u4E2D\u7F3A\u5C11 package.json \u6587\u4EF6"));
                                        process.exit(1);
                                    }
                                    (0, installDeps_1.default)(appPath);
                                    return [2 /*return*/];
                                }
                                appPath = path_1.default.join(CWD, './', appId);
                                if (!(0, isPathExist_1.default)(appPath)) {
                                    log.logError("".concat(style.redBold(appId), " \u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u62FC\u5199\u6B63\u786E"));
                                    process.exit(1);
                                }
                                (0, installDeps_1.default)(appPath);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // start [app:name]
                commander_1.default
                    .command('start [appId]')
                    .description('start a app, eg. yarn eris start my-app')
                    .action(function (appId) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isActionActivated = true;
                                _a = appId;
                                if (_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, set_app_id_1.getDefaultAppId)()];
                            case 1:
                                _a = (_b.sent());
                                _b.label = 2;
                            case 2:
                                appId = _a;
                                if (!appId) {
                                    log.logError("".concat(style.redBold('appId'), " \u4E0D\u80FD\u4E3A\u7A7A"));
                                    process.exit(1);
                                }
                                (0, start_app_1.default)(appId);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // build [app:name]
                commander_1.default
                    .command('build [appId]')
                    .description('build a app, eg. yarn eris build my-app')
                    .option('--env [buildEnv]', 'build environment, [test|testing|prod|production]')
                    .action(function (appId, options) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, buildEnv, appPath;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                isActionActivated = true;
                                _a = appId;
                                if (_a) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, set_app_id_1.getDefaultAppId)()];
                            case 1:
                                _a = (_b.sent());
                                _b.label = 2;
                            case 2:
                                appId = _a;
                                appId = appId.replace(/:/, '-');
                                if (!appId) {
                                    log.logError("".concat(style.redBold('appId'), " \u4E0D\u80FD\u4E3A\u7A7A"));
                                    process.exit(1);
                                }
                                buildEnv = 'production';
                                if (['test', 'testing'].includes(options.env)) {
                                    buildEnv = 'testing';
                                }
                                appPath = (0, project_1.getAppPath)(appId);
                                handleBuildNormal(appId, (0, project_1.getAppPath)(appId), buildEnv);
                                return [2 /*return*/];
                        }
                    });
                }); });
                commander_1.default
                    .command('dev-tpl')
                    .description('development template by yourself')
                    .option('-c, --config <configFileName>', 'rename your tpl.config.js')
                    .action(function (options) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        isActionActivated = true;
                        new devtpl_1.default({
                            configFile: (options && options.config) || 'tpl.config.dev.js',
                        });
                        return [2 /*return*/];
                    });
                }); });
                // TODO
                // DEVELOPMENT MODULE
                // development a module
                commander_1.default.on('--help', function () {
                    (0, help_examples_1.default)();
                });
                (0, options_1.addCommand)({ name: 'set [appId]', description: 'set app under development' }, function (appId) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                isActionActivated = true;
                                return [4 /*yield*/, (0, set_app_id_1.setDefaultAppId)(appId)];
                            case 1:
                                _a.sent();
                                log.logInfo("\u5F53\u524D\u5F00\u53D1\u5E94\u7528\u88AB\u8BBE\u7F6E\u4E3A".concat(appId));
                                return [2 /*return*/];
                        }
                    });
                }); });
                (0, options_1.addCommand)({
                    name: 'deploy-test',
                    description: 'build and create a pipeline to deploy to test environment',
                }, function () { return __awaiter(void 0, void 0, void 0, function () {
                    var appId, project;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                isActionActivated = true;
                                return [4 /*yield*/, (0, set_app_id_1.getDefaultAppId)()];
                            case 1:
                                appId = _a.sent();
                                if (!appId) {
                                    log.logError("\u6CA1\u6709\u627E\u5230 appId \u4E3A ".concat(appId, " \u7684\u5E94\u7528"));
                                    return [2 /*return*/];
                                }
                                project = new project_1.Project(appId);
                                return [4 /*yield*/, project.deployToTest()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                commander_1.default.parse(process.argv);
                if (!(!isActionActivated &&
                    commander_1.default.args.length === 0 &&
                    !process.argv.includes('dev-tpl'))) return [3 /*break*/, 2];
                (0, welcome_1.default)();
                return [4 /*yield*/, (0, one_step_1.default)({ templates: config.templates })];
            case 1:
                ans = _a.sent();
                appPath = (0, project_1.getAppPath)(ans.appId);
                switch (ans.command) {
                    case 'create':
                        (0, create_app_1.default)({
                            appId: ans.appId,
                            appName: ans.appName,
                            template: ans.template,
                            tplConfig: ans.tplConfig || {},
                        });
                        break;
                    case 'start':
                        (0, start_app_1.default)(ans.appId);
                        break;
                    case 'build':
                        handleBuildNormal(ans.appId, appPath, ans.buildEnv);
                        break;
                    case 'delete_app':
                        (0, delete_app_1.default)(ans.appId);
                        break;
                    default:
                        process.exit(0);
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
function handleBuildNormal(appId, appPath, buildEnv) {
    var project = new project_1.Project(appId);
    project.build(buildEnv);
}
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
