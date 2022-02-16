import spawn from 'cross-spawn';
import * as style from '../utils/style';

export default async function spawnProcess(
  cwd: string,
  cmd: string,
  args?: string[],
): Promise<any> {
  return new Promise((resolve, reject) => {
    const cmdStr = args ? `${cmd} ${args.join(' ')}` : cmd;

    let child;

    try {
      child = spawn.sync(cmd, args || [], {
        cwd: cwd,
        stdio: 'inherit',
      });

      if (child && child.status === 0) {
        resolve({ code: 0 });
      } else {
        reject({
          code: 1,
          message: `exec command ${style.greenBold(cmdStr)} error`,
        });
      }
    } catch (error) {
      console.log(error.toString());
      reject({
        code: 1,
        message: `exec command ${style.greenBold(cmdStr)} error`,
      });
    } finally {
 
    }
  });
}
