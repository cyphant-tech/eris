"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = void 0;
var commander_1 = __importDefault(require("commander"));
function addCommand(_a, callback) {
    var name = _a.name, description = _a.description, options = _a.options;
    var command = commander_1.default.command(name).description(description);
    if (options) {
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var _b = options_1[_i], option = _b.option, description_1 = _b.description;
            command = command.option(option, description_1);
        }
    }
    command.action(callback);
}
exports.addCommand = addCommand;
