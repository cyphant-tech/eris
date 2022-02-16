import fs from 'fs';

export default function isPathExist(path: string): boolean {
  try {
    fs.accessSync(path, fs.constants.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}
