import { exec } from 'child_process';
import { ActionType } from '@/typing';

// interface ExecCommandResult {
//   code: number;
//   message?: string;
// }

// commands:
// 当前仅支持 length 为 2 的数组
export default async function execCommand(commands: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    const child = exec(`${commands[0]} && ${commands[1]}`);

    child.stdout.setEncoding('utf8');

    child.stdout.on('data', function (data) {
      console.log(data);
    });

    child.stdout.on('end', (data: any) => {
      resolve({ code: 0 });
    });

    child.stdout.on('error', function (data) {

    });

    child.stderr.on('data', function (data) {
      console.log(data);
    });

    child.on('exit', function (code) {
      code === 0
        ? resolve({ code })
        : reject({ code, message: `exec command exited with code: ${code}` });
    });
  });
}

// 相关参考:
// Execute a command line binary with Node.js
// https://stackoverflow.com/questions/20643470/execute-a-command-line-binary-with-node-js

// Node.js spawn child process and get terminal output live
// https://stackoverflow.com/questions/14332721/node-js-spawn-child-process-and-get-terminal-output-live

// Exec : display stdout “live”
// https://stackoverflow.com/questions/10232192/exec-display-stdout-live
