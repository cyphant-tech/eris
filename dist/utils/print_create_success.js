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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var log = __importStar(require("@/utils/log"));
function default_1(appId, appName, template) {
    log.logSuccess('应用创建成功');
    log.logSuccess("\u5E94\u7528ID\uFF1A".concat(appId));
    log.logSuccess("\u5E94\u7528\u540D\u79F0\uFF1A".concat(appName));
    if (template) {
        log.logSuccess("\u5E94\u7528\u6A21\u677F\uFF1A".concat(template));
    }
    log.logSuccess("\u5E94\u7528\u4F4D\u7F6E\uFF1A".concat(path_1.default.join(process.cwd(), './', appId)));
}
exports.default = default_1;
