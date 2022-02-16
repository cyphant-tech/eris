import { exec } from 'child_process';

export default async function spawnProcess(cmd: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const cp = exec(cmd);

    cp.stdout.setEncoding('utf8');

    cp.stdout.on('data', function (data) {
      console.log(data);
    });

    cp.stdout.on('end', (data: any) => {
      resolve({ code: 0 });
    });

    cp.stderr.on('data', function (data) {
      console.log(data);
    });

    cp.on('exit', function (code) {
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
