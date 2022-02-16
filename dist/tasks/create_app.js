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
var compiler_1 = __importDefault(require("@/tasks/compiler"));
var prompt_1 = __importDefault(require("@/tasks/prompt"));
var print_create_success_1 = __importDefault(require("@/utils/print_create_success"));
var start_app_1 = __importDefault(require("@/tasks/start_app"));
var isPathExist_1 = __importDefault(require("@/utils/isPathExist"));
var CWD = process.cwd();
// merge options _eris_cli_framework to template name
//
// app-tempate-h5, { _eris_cli_framework: 'vue3' }
//
function formatTemplateName(template, suffix) {
    if (!template || !suffix || suffix === 'react')
        return template;
    return "".concat(template, "-").concat(suffix);
}
function createApp(_a) {
    var appId = _a.appId, appName = _a.appName, template = _a.template, tplConfig = _a.tplConfig;
    return __awaiter(this, void 0, void 0, function () {
        var spinner, tplPath;
        return __generator(this, function (_b) {
            spinner = (0, ora_1.default)('项目创建中...');
            // config.appId (config.artifactId) 项目唯一标识，例如 my-app ，那么 my-app 就是 appId
            // config.appName 项目名称，例如：频道运营工具、开放平台审核后台...
            // 支持模板选择框架语言
            // 然后引导到不同模板
            if (tplConfig._eris_cli_framework) {
                template = formatTemplateName(template, tplConfig._eris_cli_framework);
                delete tplConfig._eris_cli_framework;
            }
            tplPath = path_1.default.join(CWD, 'node_modules/@yd/eris', 'templates', template);
            // for dev env to test
            if ((0, isPathExist_1.default)(path_1.default.join(CWD, './templates', template))) {
                tplPath = path_1.default.join(CWD, './templates', template);
            }
            // for dev env to test
            if (!(0, isPathExist_1.default)(tplPath)) {
                tplPath = path_1.default.join(__dirname, '../../templates/', template);
            }
            // eslint-disable-next-line no-new
            new compiler_1.default({
                src: tplPath,
                dest: path_1.default.join(process.cwd(), './', appId),
                config: __assign({ appId: appId, appName: appName }, tplConfig),
                onStart: function () {
                    spinner.start();
                },
                onDone: function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var needStartAns;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    spinner.stop();
                                    (0, print_create_success_1.default)(appId, appName, template);
                                    return [4 /*yield*/, prompt_1.default.startApp()];
                                case 1:
                                    needStartAns = _a.sent();
                                    process.nextTick(function () {
                                        if (needStartAns.needStart) {
                                            (0, start_app_1.default)(appId);
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
            return [2 /*return*/];
        });
    });
}
exports.default = createApp;
