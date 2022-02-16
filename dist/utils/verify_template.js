"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
function default_1(type, tplName, tpls) {
    if (!tpls) {
        return false;
    }
    if ((0, common_1.find)(tpls, 'value', tplName).length > 0) {
        return true;
    }
    return false;
}
exports.default = default_1;
