// import { spawn } from 'child_process';
import spawn from 'cross-spawn';

export default async function spawnProcess(
  cwd: string,
  cmd: string,
  args?: string[],
): Promise<any> {
  return new Promise((resolve, reject) => {
    // const child = spawn('ls', ['-a'], {
    //   cwd: cwd,
    //   stdio: 'inherit',
    // })
    const child = spawn(cmd, args || [], {
      cwd: cwd,
      stdio: 'inherit',
    });

    if (!child.stdout) {
      return;
    }

    child.stdout.on('data', function (data: any) {
      console.log(data.toString());
    });

    child.stdout.on('end', (data: any) => {
      resolve({ code: 0 });
    });

    child.stdout.on('close', (data: any) => {
      resolve({ code: 0 });
    });

    child.stderr.on('data', function (data: any) {
      console.log(data.toString());
    });

    child.on('exit', function (code: any) {
      code === 0
        ? resolve({ code })
        : reject({ code, message: `exec command exited with code: ${code}` });
    });
  });
}
