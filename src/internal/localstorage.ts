import { promises as fsp } from 'fs';
import path from 'path';
import os from 'os';

const pathToRCFile = path.join(os.homedir(), '.erisrc');

async function readConfig() {
  let content = null;
  try {
    content = await fsp.readFile(pathToRCFile);
  } catch {
    return {};
  }

  if (!content) {
    return {};
  }
  return JSON.parse(content.toString());
}

async function setItem(key: string, value: string) {
  const existingConfig = await readConfig();

  const newConfig = {
    ...existingConfig,
    [key]: value,
  };

  await fsp.writeFile(pathToRCFile, JSON.stringify(newConfig, null, 2));
}

async function getItem(key: string) {
  const existingConfig = await readConfig();
  const res = existingConfig[key];
  return res;
}

export default {
  setItem,
  getItem,
};
