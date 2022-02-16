import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const copyFileAsync = promisify(fs.copyFile);

interface CopyFileOptions {
  /**
   * @param exclude: copy file exclude config
   * @param handler: copy middleware, modify file content as required
   * @parma onlyCopy: onlyCopy extensions
   */
  exclude?: RegExp[];
  handler?: (filePath?: string, content?: string) => string;
  onlyCopy?: string[];
}

export default async function copyFileSync(
  src: string,
  dest: string,
  options?: CopyFileOptions,
) {
  options = options || {};
  const onlyCopyExtensions = options.onlyCopy || [];

  if (Array.isArray(options.exclude)) {
    let flag = false;
    options.exclude.forEach((item) => {
      if (item.test(src)) flag = true;
    });
    if (flag) return false;
  }

  if (
    onlyCopyExtensions.length > 0 &&
    onlyCopyExtensions.includes(path.extname(src))
  ) {
    try {
      await copyFileAsync(src, dest);
    } catch (e) {
      console.log(src, dest);
      throw e;
    }
  } else {
    let fileContent: Promise<string> | string = await readFileAsync(src, {
      encoding: 'utf8',
    });

    if (typeof options.handler === 'function') {
      fileContent = await options.handler(src, fileContent);
    }

    await writeFileAsync(dest, fileContent, { encoding: 'utf8' });
  }

  return true;
}
