import path from 'path';
import * as log from '@/utils/log';

export default function (appId: string, appName: string, template?: string) {
  log.logSuccess('应用创建成功');
  log.logSuccess(`应用ID：${appId}`);
  log.logSuccess(`应用名称：${appName}`);
  if (template) {
    log.logSuccess(`应用模板：${template}`);
  }
  log.logSuccess(`应用位置：${path.join(process.cwd(), './', appId)}`);
}
