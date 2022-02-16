import path from 'path';

require('../../helpers/module-alias')({
  base: path.join(__dirname, '../../'),
});

import { BuildEnv } from './../typing.d';
import isPathExist from '@/utils/isPathExist';
import program from 'commander';
import * as style from '@/utils/style';
import * as log from '@/utils/log';
import verifyTemplate from '@/utils/verify_template';
import helpExamples from './help_examples';
import prompt from '@/tasks/prompt';
import createApp from '@/tasks/create_app';
import createAppFromGit from '@/tasks/create_app_from_git';
import verifyApp from '@/utils/verify_app';
import execCommand from '@/tasks/exec_command';
import oneStep from '@/tasks/one_step';
import welcome from '@/utils/welcome';
import DevTpl from '@/devtools/devtpl';
import startApp from '@/tasks/start_app';
import deleteApp from '@/tasks/delete_app';
import installDeps from '@/utils/installDeps';

import { InquirerAnswers } from '@/typing';
import { addCommand } from '@/internal/options';
import { getAppPath, Project } from '@/internal/project';
import { getDefaultAppId, setDefaultAppId } from '@/tasks/set_app_id';

const CWD = process.cwd();

function checkVersion() {
  // v10.12.0++
  const suggestVersion = '10.12.0';
  const nodeVersion = process.versions.node;
  if (
    parseInt(nodeVersion.split('.')[0]) < parseInt(suggestVersion.split('.')[0])
  ) {
    log.logInfo(`当前 Node 版本：v${nodeVersion}`);
    log.logInfo(`建议 Node 版本：v${suggestVersion}++`);
    log.logWarning('Node 版本过低可能会导致脚手架无法运行');
  }
}

export default async (config: any) => {
  checkVersion();

  let isActionActivated = false;

  program.name('eris').version(config.version).usage('[command] [options]');

  // 创建应用
  // eris create my-app --app-title 'My App' --template app-template-h5
  program
    .command('create [appId]')
    .description('create an application')
    .option('--app-name <appName>', 'What is your app name')
    .option('--template <templateName>', 'Which template to use')
    .action(async (appId, options) => {
      // target:
      // 例如：
      // create my-app 会创建一个以 my-app 命名的应用
      isActionActivated = true;

      if (!appId) {
        log.logError(style.redBold('[appId] 未填写'));
        process.exit(1);
      }

      // 兼容旧版写法，自动替换为 -
      appId = appId.replace(/:/, '-');

      const createType = 'app';
      let appName = '';
      let template = '';
      let fromGit = false;
      let tplConfig = {};

      if (!verifyApp(appId)) {
        log.logError(`${style.red('应用ID不合法或者重复，换一个试试')}`);
        process.exit(0);
      }

      // 应用名称
      if (options.appName) {
        appName = options.appName;
      } else {
        const appNameAns = await prompt.appName(appId);
        appName = appNameAns.appName;
      }

      // 模板选择
      // verifyTemplate
      if (options.template) {
        // using template from a git repository
        if (/^(https?:\/\/).+(\.git)$/.test(options.template)) {
          fromGit = true;
        } else if (
          !verifyTemplate(
            createType,
            options.template,
            config.templates[createType],
          )
        ) {
          log.logError(
            `${style.greenBold(createType)} 中未包含名称为 ${style.redBold(
              options.template,
            )} 的模板，请重新运行`,
          );
          process.exit(1);
        }

        template = options.template;

        // 从 git 远程模板创建应用时暂时不支持模板配置
        if (!fromGit) {
          const tplAns: any = await prompt.template(
            config.templates[createType],
            template,
          );
          tplConfig = tplAns.tplConfig;
        }

        // 如果命令里明确指定了模板，暂时默认使用 dark 主题
        // options.theme = 'dark';
        // TODO:
        // 进行配置选择
      } else {
        const tplAns: any = await prompt.template(config.templates[createType]);
        template = tplAns.template;
        tplConfig = tplAns.tplConfig || {};
      }

      switch (createType) {
        case 'app':
          fromGit
            ? await createAppFromGit({ appId, appName, template, fromGit })
            : createApp({ appId, appName, template, tplConfig });
          break;
        default:
          console.log('ERROR');
          process.exit(1);
      }
    });

  // install 不加参数，相当于 cd fe，然后执行 yarn，更新工作区依赖
  // install [appId] 进入某个应用安装依赖
  program
    .command('install [appId]')
    .description(
      'install node modules in your app, eg. yarn eris install my-app',
    )
    .action(async (appId) => {
      isActionActivated = true;
      appId = appId || (await getDefaultAppId());

      let appPath;
      // 不指定 appid，在 yarn workspace 安装
      if (!appId) {
        appPath = path.join(CWD, './');
        if (!isPathExist(path.join(appPath, 'package.json'))) {
          log.logError(
            `${style.redBold(appPath)} 目录中缺少 package.json 文件`,
          );
          process.exit(1);
        }
        installDeps(appPath);
        return;
      }

      appPath = path.join(CWD, './', appId);

      if (!isPathExist(appPath)) {
        log.logError(`${style.redBold(appId)} 不存在，请检查是否拼写正确`);
        process.exit(1);
      }

      installDeps(appPath);
    });

  // start [app:name]
  program
    .command('start [appId]')
    .description('start a app, eg. yarn eris start my-app')
    .action(async (appId) => {
      isActionActivated = true;
      appId = appId || (await getDefaultAppId());

      if (!appId) {
        log.logError(`${style.redBold('appId')} 不能为空`);
        process.exit(1);
      }

      startApp(appId);
    });

  // build [app:name]
  program
    .command('build [appId]')
    .description('build a app, eg. yarn eris build my-app')
    .option(
      '--env [buildEnv]',
      'build environment, [test|testing|prod|production]',
    )
    .action(async (appId, options) => {
      isActionActivated = true;
      appId = appId || (await getDefaultAppId());
      appId = appId.replace(/:/, '-');

      if (!appId) {
        log.logError(`${style.redBold('appId')} 不能为空`);
        process.exit(1);
      }

      let buildEnv: BuildEnv = 'production';

      if (['test', 'testing'].includes(options.env)) {
        buildEnv = 'testing';
      }

      const appPath = getAppPath(appId);

      handleBuildNormal(appId, getAppPath(appId), buildEnv);
    });

  // DEVELOPMENT MODULE
  // development a template
  // interface TplOptions {}

  interface DevTplOptions {
    config?: string;
  }

  program
    .command('dev-tpl')
    .description('development template by yourself')
    .option('-c, --config <configFileName>', 'rename your tpl.config.js')
    .action(async (options: DevTplOptions) => {
      isActionActivated = true;
      new DevTpl({
        configFile: (options && options.config) || 'tpl.config.dev.js',
      });
    });

  // TODO
  // DEVELOPMENT MODULE
  // development a module
  program.on('--help', () => {
    helpExamples();
  });

  addCommand(
    { name: 'set [appId]', description: 'set app under development' },
    async (appId: string) => {
      isActionActivated = true;
      await setDefaultAppId(appId);
      log.logInfo(`当前开发应用被设置为${appId}`);
    },
  );

  addCommand(
    {
      name: 'deploy-test',
      description: 'build and create a pipeline to deploy to test environment',
    },
    async () => {
      isActionActivated = true;
      const appId = await getDefaultAppId();
      if (!appId) {
        log.logError(`没有找到 appId 为 ${appId} 的应用`);
        return;
      }

      const project = new Project(appId);
      await project.deployToTest();
    },
  );

  program.parse(process.argv);

  if (
    !isActionActivated &&
    program.args.length === 0 &&
    !process.argv.includes('dev-tpl')
  ) {
    welcome();
    const ans: InquirerAnswers = await oneStep({ templates: config.templates });
    const appPath = getAppPath(ans.appId);

    switch (ans.command) {
      case 'create':
        createApp({
          appId: ans.appId,
          appName: ans.appName,
          template: ans.template,
          tplConfig: ans.tplConfig || {},
        });
        break;
      case 'start':
        startApp(ans.appId);
        break;
      case 'build':
        handleBuildNormal(ans.appId, appPath, ans.buildEnv);
        break;
      case 'delete_app':
        deleteApp(ans.appId);
        break;
      default:
        process.exit(0);
    }
  }
};

function handleBuildNormal(appId: string, appPath: string, buildEnv: BuildEnv) {
  const project = new Project(appId);
  project.build(buildEnv);
}

function getAppPkgScripts(appPath: string) {
  if (!isPathExist(appPath)) {
    log.logError(`找不到 ${appPath}`);
    process.exit(0);
  }
  const pkgJSON = require(path.join(appPath, 'package.json'));
  if (pkgJSON && pkgJSON.scripts) {
    return pkgJSON.scripts;
  }

  return {};
}
