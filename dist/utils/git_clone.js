"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
function checkoutBranch(git, targetPath, branchName) {
    return new Promise(function (resolve, reject) {
        var args = ['checkout', branchName];
        var process = (0, child_process_1.spawn)(git, args, { cwd: targetPath });
        process.on('close', function (status) {
            if (status == 0) {
                resolve();
            }
            else {
                reject('git checkout failed with status ' + status);
            }
        });
    });
}
function gitClone(repo, targetPath, opts) {
    opts = opts || {};
    var git = opts.git || 'git';
    var args = ['clone'];
    if (opts.shallow) {
        args.push('--depth');
        args.push('1');
    }
    args.push('--');
    args.push(repo);
    args.push(targetPath);
    return new Promise(function (resolve, reject) {
        var process = (0, child_process_1.spawn)(git, args);
        process.on('close', function (status) {
            if (status == 0) {
                if (opts.checkout) {
                    return checkoutBranch(git, targetPath, opts.checkout);
                }
                else {
                    resolve();
                }
            }
            else {
                reject('git clone failed with status' + status);
            }
        });
    });
}
exports.default = gitClone;
