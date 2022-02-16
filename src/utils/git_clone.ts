import { spawn } from 'child_process';

export interface GitCloneOptions {
  git?: string;
  shallow?: boolean;
  checkout?: string;
}

function checkoutBranch(git: string, targetPath: string, branchName: string) {
  return new Promise<void>((resolve, reject) => {
    const args = ['checkout', branchName];
    const process = spawn(git, args, { cwd: targetPath });
    process.on('close', (status: number) => {
      if (status == 0) {
        resolve();
      } else {
        reject('git checkout failed with status ' + status);
      }
    });
  });
}

export default function gitClone(
  repo: string,
  targetPath: string,
  opts?: GitCloneOptions,
) {
  opts = opts || {};

  const git = opts.git || 'git';
  const args = ['clone'];

  if (opts.shallow) {
    args.push('--depth');
    args.push('1');
  }

  args.push('--');
  args.push(repo);
  args.push(targetPath);

  return new Promise<void>((resolve, reject) => {
    const process = spawn(git, args);

    process.on('close', (status: number) => {
      if (status == 0) {
        if (opts.checkout) {
          return checkoutBranch(git, targetPath, opts.checkout);
        } else {
          resolve();
        }
      } else {
        reject('git clone failed with status' + status);
      }
    });
  });
}
