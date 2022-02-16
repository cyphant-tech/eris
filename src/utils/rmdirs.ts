// https://stackoverflow.com/a/55661804/4210625

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import * as log from '@/utils/log';

const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);
const unlink = promisify(fs.unlink);
const stat = promisify(fs.stat);

export default async function rmdirs(dir: string) {
  try {
    // for v10++, withFileTypes is added in v10.10.0
    // let entries = await readdir(dir, { withFileTypes: true });
    const entries = await readdir(dir);
    await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry);
        // const fileStat = await stat(fullPath);
        return fs.lstatSync(fullPath).isDirectory() ? rmdirs(fullPath) : unlink(fullPath);
      }),
    );
    await rmdir(dir);
  } catch (e) {
    console.log('/n');
    log.logError('rmdirs');
    console.log(e.toString());
    throw e;
  }
}
