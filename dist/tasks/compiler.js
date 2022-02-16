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
var path_1 = __importDefault(require("path"));
var ejs_1 = __importDefault(require("ejs"));
var copy_async_1 = __importDefault(require("../utils/copy_async"));
var log = __importStar(require("../utils/log"));
var promise_delay_1 = __importDefault(require("@/utils/promise_delay"));
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
var Compiler = /** @class */ (function () {
    function Compiler(options) {
        this.src = options.src;
        this.dest = options.dest;
        this.config = options.config;
        if (this.config.customParams) {
            this.config = __assign(__assign({}, this.config), this.config.customParams);
        }
        // Compiler 内置配置
        this.resolve = {
            extensions: [
                '.js',
                '.jsx',
                '.less',
                '.css',
                '.scss',
                '.ejs',
                '.ts',
                '.tsx',
                '.md',
                '.json',
                '.vue',
            ],
            // exclude: [/node_modules/, /\.umi\/?$/, /\.git/, /yarn\.lock/, /package-lock\.json/],
            exclude: [/\.umi\/?$/, /\.git/, /yarn\.lock/, /package-lock\.json/],
        };
        this.onStart = options.onStart;
        this.onDone = options.onDone;
        this.init();
    }
    Compiler.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.onStart && this.onStart();
                        // 暂时不支持 handler
                        // 同步处理
                        // copySync(this.src, this.dest);
                        // content => this.compileFileContent(content, this.config)
                        return [4 /*yield*/, (0, copy_async_1.default)(this.src, this.dest, {
                                exclude: this.resolve.exclude,
                                onlyCopy: ONLY_COPY_FILES,
                                handler: function (file, content) {
                                    if (_this.resolve.extensions.includes(path_1.default.extname(file))) {
                                        return _this.compileFileContent(content, _this.config);
                                    }
                                    return content;
                                },
                            })];
                    case 1:
                        // 暂时不支持 handler
                        // 同步处理
                        // copySync(this.src, this.dest);
                        // content => this.compileFileContent(content, this.config)
                        _a.sent();
                        // hack copyAsync resolved 不准确
                        return [4 /*yield*/, (0, promise_delay_1.default)(1000)];
                    case 2:
                        // hack copyAsync resolved 不准确
                        _a.sent();
                        this.onDone && this.onDone();
                        return [2 /*return*/];
                }
            });
        });
    };
    Compiler.prototype.compileFileContent = function (tpl, data) {
        try {
            tpl = ejs_1.default.render(tpl, data);
        }
        catch (e) {
            log.logError(e.toString());
            return tpl;
        }
        return tpl;
    };
    return Compiler;
}());
exports.default = Compiler;
