/* eslint-disable no-async-promise-executor */
// import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import ora from 'ora';
import isPathExist from '@/utils/isPathExist';
import * as log from '@/utils/log';
import copyAsync from '../utils/copy_async';
import copyFileAsync from '../utils/copy_file_async';
import watch from 'node-watch';
import delay from '@/utils/promise_delay';

interface DevTplOptions {
  configFile?: string;
}

interface TplConfig {
  name: string;
  baseUrl: string;
  output: string;
  params?: { [key: string]: any };
}

// const CWD = process.cwd();

class DevTpl {
  private configFileDir: string;
  private configFilePath: string;
  private tplConfig: TplConfig;
  private src: string;
  private dest: string;
  private resolve: { extensions?: string[]; exclude?: RegExp[] };

  constructor(options: DevTplOptions) {
    // 内置配置
    this.resolve = {
      // compile: include files
      extensions: [
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.ejs',
        '.less',
        '.css',
        '.scss',
        '.md',
        '.json',
      ],
      // copy: exclude files or folders
      exclude: [
        /node_modules/,
        /\.umi\/?$/,
        /\.git/,
        /yarn\.lock/,
        /package-lock\.json/,
      ],
    };

    this.configFileDir = path.join(process.cwd(), './templates');
    this.configFilePath = path.join(this.configFileDir, options.configFile);

    if (!isPathExist(this.configFilePath)) {
      log.logError(`${this.configFilePath} is not exist`);
      return;
    }

    this.getConfig(this.configFilePath).then(
      async (ret: { src: string; dest: string }) => {
        try {
          await this.compileInitial(ret.src, ret.dest);
        } catch (e) {
          console.log(e.toString());
        }
        log.logInfo('DEV_TPL: first compile completed');
        log.logInfo('DEV_TPL: waiting for changes...');
        this.compileWatch();
      },
    );
  }

  async getConfig(filePath: string) {
    return new Promise(async (resolve, reject) => {
      try {
        this.tplConfig = await import(filePath);

        const tplConfig = this.tplConfig;

        this.src = path.resolve(
          this.configFileDir,
          tplConfig.baseUrl,
          tplConfig.name,
        );

        this.dest = path.resolve(
          this.configFileDir,
          tplConfig.baseUrl,
          tplConfig.output,
          tplConfig.name,
        );

        resolve({ src: this.src, dest: this.dest });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * compileInitial - total compiler
   * @param src template source dir
   * @param dest template dest dir
   */
  async compileInitial(src: string, dest: string) {
    return new Promise<void>(async (resolve) => {
      try {
        await copyAsync(src, dest, {
          exclude: this.resolve.exclude,
          handler: (file: string, content: string) => {
            if (this.resolve.extensions.includes(path.extname(file))) {
              return this.compileFileContent(content, this.tplConfig.params);
            }
            return content;
          },
        });

        // 暂时无法准确获取 copyAsync 结束时间
        // hack copyAsync resolved 不准确
        delay(1000).then(() => resolve());
      } catch (e) {
        resolve(e);
      }
    });
  }

  // increment compiler
  // source file => dest file
  /**
   *
   * @param src source file
   * @param dest dest file
   */
  async compileIncrement(src: string, dest: string) {
    return new Promise<void>((resolve) => {
      copyFileAsync(src, dest, {
        exclude: this.resolve.exclude,
        handler: (file: string, content: string) => {
          if (this.resolve.extensions.includes(path.extname(file))) {
            return this.compileFileContent(content, this.tplConfig.params);
          }
          return content;
        },
      });
      resolve();
    });
  }

  compileWatch() {
    watch(
      path.join(this.configFileDir, this.tplConfig.name),
      {
        recursive: true,
        filter: (f) => !/node_modules|(\.umi$)/.test(f),
        delay: 500,
      },
      async (evt, name) => {
        log.logInfo(`${name} changed`);

        const spinner = ora('file compiling...');
        const sourceFile = name;
        const destFile = name.replace(
          this.tplConfig.name,
          'dist/' + this.tplConfig.name,
        );

        await this.compileIncrement(sourceFile, destFile);

        spinner.stop();
        log.logInfo('file compiled success');
        log.logInfo('DEV_TPL: waiting for changes...');
      },
    );
  }

  // 暂不支持自动启动，需要手动启动
  // startTpl() {}

  compileFileContent(tpl: string, data: { [key: string]: any }) {
    try {
      tpl = ejs.render(tpl, data);
    } catch (e) {
      console.log(tpl);
      log.logError(e.toString());
      return tpl;
    }
    return tpl;
  }
}

export default DevTpl;
