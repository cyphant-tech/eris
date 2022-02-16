"use strict";
// a fork from sindresorhus
// https://github.com/sindresorhus/log-symbols/blob/master/index.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var isSupported = process.platform !== 'win32' ||
    process.env.CI ||
    process.env.TERM === 'xterm-256color';
var main = {
    info: chalk_1.default.blue('ℹ'),
    success: chalk_1.default.green('✔'),
    warning: chalk_1.default.yellow('⚠'),
    error: chalk_1.default.red('✖'),
};
var fallbacks = {
    info: chalk_1.default.blue('i'),
    success: chalk_1.default.green('√'),
    warning: chalk_1.default.yellow('‼'),
    error: chalk_1.default.red('×'),
};
exports.default = isSupported ? main : fallbacks;
