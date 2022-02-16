/* eslint-disable no-async-promise-executor */
import path from 'path';
import del from 'del';
import ora from 'ora';
import inquirer from 'inquirer';
import clone from '@/utils/git_clone';
import * as log from '@/utils/log';
import Compiler from '@/tasks/compiler';
import prompt from '@/tasks/prompt';
import execCommand from '@/tasks/exec_command';
import printCreateSuccess from '@/utils/print_create_success';

interface CreateAppOptions {
  /**
   * @param appId app folder name, eg: my-app
   * @param appName app external name, eg: Simple Admin
   * @param template which template to use, from local or git
   * @param fromGit template from git or not
   * @param config template config provided by template author
   */
  appId: string;
  appName: string;
  template: string;
  fromGit?: boolean;
  config?: { [key: string]: any };
}

export default async function createAppFromGit(options: CreateAppOptions) {
  return new Promise<void>(async (resolve) => {
    const appId = options.appId;
    const appName = options.appName;
    const gitRepo = options.template;
    const dest = path.join(process.cwd(), './', appId);

    const spinnerClone = ora('cloneing...');

    try {
      spinnerClone.start();
      await clone(gitRepo, dest);
      await del([path.join(dest, '.git')]);
      log.logSuccess(`\nclone template success in ${dest}`);
      spinnerClone.stop();

      const tplConfig = await import(
        path.join(dest, './tpl.config.production.js')
      );
      if (tplConfig.options && tplConfig.options.length > 0) {
        const tplAns: any = await inquirer.prompt(tplConfig.options);

        compilerInstance(dest, dest, {
          appId,
          appName,
          autoStart: tplConfig.autoStart,
          customParams: { ...tplAns },
        });
      } else {
        resolve();
      }
    } catch (e) {
      resolve(e);
    }
  });
}

interface CustomParams {
  [key: string]: any;
}

interface CompilerOptions {
  appId: string;
  appName: string;
  autoStart?: boolean;
  customParams: CustomParams;
  onStart?: () => void;
  onDone?: () => void;
}

function compilerInstance(src: string, dest: string, options: CompilerOptions) {
  const spinner = ora('compiling...');
  // eslint-disable-next-line no-new
  new Compiler({
    src: src,
    dest: dest,
    config: options,
    onStart() {
      spinner.start();
    },
    async onDone() {
      printCreateSuccess(options.appId, options.appName);

      // remove unuseful files
      await del([path.join(dest, 'tpl.config.*')]);

      spinner.stop();

      if (!options.autoStart) {
        return process.exit(0);
      }

      const needStartAns = await prompt.startApp();
      process.nextTick(() => {
        if (needStartAns.needStart) {
          log.logInfo('如果启动失败，可尝试进入目标应用手动安装依赖修复');
          const appDir = path.join(process.cwd(), './', options.appId);
          execCommand([`cd ${appDir}`, 'yarn start']);
        } else {
          process.exit(0);
        }
      });
    },
  });
}
