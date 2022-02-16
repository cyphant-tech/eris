import { promises as fsp } from 'fs';
import path from 'path';
import execCommand from '@/tasks/exec_command';
import isPathExist from '@/utils/isPathExist';
import * as log from '@/utils/log';
import simpleGit, { SimpleGit } from 'simple-git';

export function getAppPath(appId: string) {
  return path.join(process.cwd(), './', appId);
}

function getAppPkgScripts(appPath: string) {
  if (!isPathExist(appPath)) {
    log.logError(`找不到 ${appPath}`);
    process.exit(0);
  }
  const pkgJSON = require(path.join(appPath, 'package.json'));
  if (pkgJSON && pkgJSON.scripts) {
    return pkgJSON.scripts;
  }

  return {};
}

export async function getProjectConfig(appId: string) {
  const configPath = path.resolve(getAppPath(appId), 'project.json');
  let content = null;
  try {
    content = await fsp.readFile(configPath, 'utf8');
  } catch {
    // file is not exist
    return null;
  }

  return JSON.parse(content);
}

export class Project {
  appId: string;
  appRootPath: string;
  constructor(appId: string) {
    this.appId = appId;
    this.appRootPath = getAppPath(appId);
  }

  async build(env?: string) {
    let buildCommand = 'yarn build';
    if (env && getAppPkgScripts(this.appRootPath)[`build:${env}`]) {
      buildCommand = `yarn build:${env}`;
    }
    return execCommand([`cd ${getAppPath(this.appId)}`, buildCommand]);
  }

  async deployToTest() {
    log.logInfo('开始构建');
    try {
      await this.build('testing');
    } catch {
      log.logError('构建失败');
      return;
    }

    const git: SimpleGit = simpleGit({
      baseDir: process.cwd(),
    });
    const { current } = await git.branch();
    log.logInfo(`当前分支是 ${current}`);
    await git.add('.');
    await git.commit('chore: update build');

    log.logInfo('推送到remote......');
    try {
      await git.push('origin', current);
    } catch {
      log.logError('push 到远程仓库失败');
      return;
    }

    log.logInfo('创建pipeline');
  }
}
