import path from 'path';
import isPathExist from './isPathExist';

export default (appId: string) => {
  if (isPathExist(path.join(process.cwd(), './', appId))) {
    return false;
  }
  return true;
};
