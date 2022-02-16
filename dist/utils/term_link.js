"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ansi_escapes_1 = __importDefault(require("ansi-escapes"));
var supportsHyperlinks = require('supports-hyperlinks');
exports.default = (function (text, url) {
    if (!supportsHyperlinks.stdout) {
        return false;
    }
    return ansi_escapes_1.default.link(text, url);
});
