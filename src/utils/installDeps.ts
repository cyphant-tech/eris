// import spawnProcess from '@/utils/spawn_process';
import spawnProcessSync from '@/utils/spawnProcessSync';
import getTplInfo from '@/utils/get_tpl_info';
import * as log from '../utils/log';

export default async function installDeps(appPath: string) {
  const tplInfo = await getTplInfo(appPath);
  let retInstall;

  try {
    if (tplInfo.vue) {
      // vue-cli 暂不支持 yarn workspace，需要使用 npm install 安装
      // https://github.com/vuejs/vue-cli/issues/4911
      retInstall = await spawnProcessSync(appPath, 'npm', ['install']);
    } else {
      retInstall = await spawnProcessSync(appPath, 'yarn');
    }

    if (!retInstall || retInstall.code !== 0) {
      console.log('\n');
      log.logError(retInstall.message);
    }
  } catch (error) {
    console.log('\n');
    log.logError(error.message);
  }

  return retInstall;
}
