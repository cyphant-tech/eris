import path from 'path';
import spawnProcess from '@/utils/spawn_process';
import isPathExist from '../utils/isPathExist';
import * as style from '../utils/style';
import * as log from '../utils/log';
// import getTplInfo from '@/utils/get_tpl_info';
import installDeps from '@/utils/installDeps';

const CWD = process.cwd();

export default async function (appId: string) {
  const appPath = path.join(CWD, './', appId);

  if (!isPathExist(appPath)) {
    log.logError(`${style.redBold(appId)} 不存在，请检查是否拼写正确`);
    process.exit(1);
  }

  if (!isPathExist(path.join(appPath, 'node_modules'))) {
    const retInstall = await installDeps(appPath);

    if (!retInstall || retInstall.code !== 0) {
      log.logError('自动安装依赖失败！可尝试进入目标应用手动安装');
    }
  }

  log.logInfo('如果启动失败，可尝试进入目标应用手动安装依赖修复');

  spawnProcess(appPath, 'yarn', ['start']);
}
