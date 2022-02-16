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
var inquirer_1 = __importDefault(require("inquirer"));
var verify_app_1 = __importDefault(require("@/utils/verify_app"));
var log = __importStar(require("@/utils/log"));
var common_1 = require("@/utils/common");
var help_examples_1 = __importDefault(require("@/cli/help_examples"));
var getCommandQuestions = function () { return [
    {
        type: 'list',
        name: 'command',
        message: '请选择需要执行的操作',
        choices: [
            {
                name: '创建应用',
                value: 'create',
            },
            {
                name: '启动应用',
                value: 'start',
            },
            {
                name: '打包应用',
                value: 'build',
            },
            {
                name: '删除应用',
                value: 'delete_app',
            },
            {
                name: '查看帮助',
                value: 'help',
            },
            {
                name: '退出',
                value: 'exit',
            },
        ],
        filter: function (val) { return val.toLowerCase(); },
    },
]; };
var getAppInfoQuestions = function () { return [
    {
        type: 'input',
        name: 'appId',
        message: '请输入应用ID（即目录名称，例如 my-app）',
        validate: function (value) {
            if (value.trim() !== '' && (0, verify_app_1.default)(value)) {
                return true;
            }
            return '应用ID不合法或者重复，换一个试试';
        },
    },
    {
        type: 'input',
        name: 'appName',
        message: '请输入应用名称',
        validate: function (value) {
            if (value.trim() !== '') {
                return true;
            }
            return '应用名称不能为空';
        },
    },
]; };
var getStartQuestions = function () { return [
    {
        type: 'input',
        name: 'appId',
        message: '请输入应用ID',
        validate: function (value) {
            if (value.trim() !== '') {
                return true;
            }
            return '应用ID不能为空';
        },
    },
]; };
var getAppidQuestions = function () { return [
    {
        type: 'input',
        name: 'appId',
        message: '请输入应用ID',
        validate: function (value) {
            if (value.trim() !== '') {
                return true;
            }
            return '应用ID不能为空';
        },
    },
    {
        type: 'list',
        name: 'buildEnv',
        message: '请选择打包方式',
        choices: [
            {
                name: '测试环境',
                value: 'testing',
            },
            {
                name: '生产环境',
                value: 'production',
            },
        ],
    },
]; };
var delAppidQuestions = function () { return [
    {
        type: 'input',
        name: 'appId',
        message: '请输入应用ID',
        validate: function (value) {
            if (value.trim() !== '') {
                return true;
            }
            return '应用ID不能为空';
        },
    },
]; };
function oneStep(options) {
    return __awaiter(this, void 0, void 0, function () {
        var commandAns, command;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt(getCommandQuestions())];
                case 1:
                    commandAns = _a.sent();
                    command = commandAns.command;
                    switch (command) {
                        case 'create':
                            return [2 /*return*/, handleCreate(options)];
                        case 'start':
                            return [2 /*return*/, handleStart()];
                        case 'build':
                            return [2 /*return*/, handleBuild()];
                        case 'delete_app':
                            return [2 /*return*/, handleDeleteApp()];
                        case 'help':
                            (0, help_examples_1.default)();
                            process.exit(0);
                            break;
                        case 'exit':
                            log.logInfo('Tips: 中途随时都可以按【Ctrl + C】退出');
                            process.exit(0);
                            break;
                        default:
                            process.exit(0);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function handleCreate(options, template) {
    return __awaiter(this, void 0, void 0, function () {
        var appInfoAns, tplAns, appTemplates, tplOptions, tplOptionsAns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt(getAppInfoQuestions())];
                case 1:
                    appInfoAns = _a.sent();
                    tplAns = {};
                    appTemplates = options.templates.app;
                    if (!!template) return [3 /*break*/, 3];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'template',
                                message: '请选择应用模板',
                                choices: appTemplates,
                                filter: function (val) { return val.toLowerCase(); },
                            },
                        ])];
                case 2:
                    tplAns = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    tplAns = { template: template };
                    _a.label = 4;
                case 4:
                    tplOptions = (0, common_1.find)(appTemplates, 'value', tplAns.template)[0].options;
                    if (!tplOptions || tplOptions.length === 0) {
                        return [2 /*return*/, __assign(__assign(__assign({}, appInfoAns), tplAns), { command: 'create' })];
                    }
                    return [4 /*yield*/, inquirer_1.default.prompt(tplOptions)];
                case 5:
                    tplOptionsAns = _a.sent();
                    return [2 /*return*/, __assign(__assign(__assign({}, appInfoAns), tplAns), { tplConfig: tplOptionsAns, command: 'create' })];
            }
        });
    });
}
function handleStart() {
    return __awaiter(this, void 0, void 0, function () {
        var appIdAns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt(getStartQuestions())];
                case 1:
                    appIdAns = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, appIdAns), { command: 'start' })];
            }
        });
    });
}
function handleBuild() {
    return __awaiter(this, void 0, void 0, function () {
        var appIdAns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt(getAppidQuestions())];
                case 1:
                    appIdAns = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, appIdAns), { command: 'build' })];
            }
        });
    });
}
function handleDeleteApp() {
    return __awaiter(this, void 0, void 0, function () {
        var appIdAns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, inquirer_1.default.prompt(delAppidQuestions())];
                case 1:
                    appIdAns = _a.sent();
                    return [2 /*return*/, __assign(__assign({}, appIdAns), { command: 'delete_app' })];
            }
        });
    });
}
exports.default = oneStep;
