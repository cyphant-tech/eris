import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import isPathExist from './isPathExist';
import copyFileAsync from './copy_file_async';
import * as log from '@/utils/log';
import mkdirSync from '@/utils/mkdir_sync';

const mkdirAsync = promisify(fs.mkdir);

interface CopyAsyncOptions {
  exclude?: RegExp[];
  handler?: (filePath: string, content: string) => string;
  onlyCopy?: string[];
}

async function copyAsync(src: string, dest: string, options: CopyAsyncOptions) {
  // 根据 exclude 规则，过滤掉不需要 copy 的目录
  if (options && options.exclude) {
    let flagContinue = true;
    options.exclude.forEach((re) => {
      if (re.test(src)) {
        flagContinue = false;
      }
    });
    if (!flagContinue) return;
  }

  if (!isPathExist(dest)) {
    try {
      // https://nodejs.org/dist/latest-v10.x/docs/api/fs.html#fs_fs_mkdir_path_options_callback
      // recursive supported >= v10.12.0
      // polyfill: https://stackoverflow.com/questions/31645738/how-to-create-full-path-with-nodes-fs-mkdirsync/40686853#40686853

      // for v10++
      // await mkdirAsync(dest, { recursive: true });

      // for v8
      mkdirSync(dest);
    } catch (e) {
      console.log('\n');
      log.logError('copyAsync -> mkdirAsync');
      console.log(e.toString());
      throw e;
    }
  }

  fs.readdir(src, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const subSrc = path.resolve(src, file);
      const subDest = path.resolve(dest, file);

      fs.stat(subSrc, (e, stats) => {
        if (e) throw e;

        if (stats.isDirectory()) {
          copyAsync(subSrc, subDest, {
            handler: options.handler,
            exclude: options.exclude,
            onlyCopy: options.onlyCopy,
          });
        } else {
          copyFileAsync(subSrc, subDest, {
            handler: options.handler,
            exclude: options.exclude,
            onlyCopy: options.onlyCopy,
          });
        }
      });
    });
  });
}

export default copyAsync;
