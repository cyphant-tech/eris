import path from 'path';
// import * as log from '@/utils/log';

const CWD = process.cwd();

// eg. 当前路径
export const getAppSourceDir = (appId: string) => {
  return path.join(CWD, './', appId);
};

// eg. dist/simple-h5
export const getAppDistDir = (appId: string) => {
  return path.join(CWD, './dist', appId);
};

// eg. /xxx/xxx/eris/.fecache/app/simple-h5
export const getAppDistCacheDir = (appId: string) => {
  return path.join(CWD, '.fecache/app', appId);
};
