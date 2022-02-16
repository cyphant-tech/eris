import path from 'path';
import isPathExist from '@/utils/isPathExist';
import rmdirs from '@/utils/rmdirs';
import * as log from '@/utils/log';
import ora from 'ora';

const CWD = process.cwd();

export default async (appId: string) => {
  const appPath = path.join(CWD, './', appId);
  if (!isPathExist(appPath)) {
    log.logError(`${appPath}不存在`);
    process.exit(0);
  }

  const spinner = ora('文件处理中...');
  spinner.start();

  await rmdirs(appPath);

  log.logSuccess(`\n${appId} 删除成功`);

  spinner.stop();
};
