import path from 'path';
import isPathExist from '@/utils/isPathExist';

export default async function getTplInfo(appPath: string) {
  const tplConfigFile = path.join(appPath, 'tpl.config.json');
  if (!isPathExist(tplConfigFile)) return {};
  try {
    const tplInfo = await require(tplConfigFile);
    return tplInfo;
  } catch (error) {
    return {};
  }
}
