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
exports.logError = exports.logWarning = exports.logSuccess = exports.logInfo = void 0;
var style = __importStar(require("./style"));
var log_symbols_1 = __importDefault(require("./log_symbols"));
function logInfo(text) {
    console.log(log_symbols_1.default.info, "".concat(style.info(text)));
}
exports.logInfo = logInfo;
function logSuccess(text) {
    console.log(log_symbols_1.default.success, style.success(text));
}
exports.logSuccess = logSuccess;
function logWarning(text) {
    console.log(log_symbols_1.default.warning, style.warning(text));
}
exports.logWarning = logWarning;
function logError(text) {
    console.log(log_symbols_1.default.error, style.error(text));
}
exports.logError = logError;
