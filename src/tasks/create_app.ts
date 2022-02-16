import path from 'path';
import ora from 'ora';
import Compiler from '@/tasks/compiler';
import prompt from '@/tasks/prompt';
import printCreateSuccess from '@/utils/print_create_success';
import startApp from '@/tasks/start_app';
import isPathExist from '@/utils/isPathExist';

interface CreateAppOptions {
  appId: string;
  appName: string;
  template: string;
  tplConfig: { [key: string]: any };
}

const CWD = process.cwd();

// merge options _eris_cli_framework to template name
//
// app-tempate-h5, { _eris_cli_framework: 'vue3' }
//
function formatTemplateName(template: string, suffix: string) {
  if (!template || !suffix || suffix === 'react') return template;
  return `${template}-${suffix}`;
}

export default async function createApp({
  appId,
  appName,
  template,
  tplConfig,
}: CreateAppOptions) {
  const spinner = ora('项目创建中...');

  // config.appId (config.artifactId) 项目唯一标识，例如 my-app ，那么 my-app 就是 appId
  // config.appName 项目名称，例如：频道运营工具、开放平台审核后台...

  // 支持模板选择框架语言
  // 然后引导到不同模板
  if (tplConfig._eris_cli_framework) {
    template = formatTemplateName(template, tplConfig._eris_cli_framework);
    delete tplConfig._eris_cli_framework;
  }

  let tplPath = path.join(CWD, 'node_modules/@yd/eris', 'templates', template);

  // for dev env to test
  if (isPathExist(path.join(CWD, './templates', template))) {
    tplPath = path.join(CWD, './templates', template);
  }

  // for dev env to test
  if (!isPathExist(tplPath)) {
    tplPath = path.join(__dirname, '../../templates/', template)
  }

  // eslint-disable-next-line no-new
  new Compiler({
    src: tplPath,
    dest: path.join(process.cwd(), './', appId),
    config: {
      appId: appId,
      appName: appName,
      ...tplConfig,
    },
    onStart() {
      spinner.start();
    },
    async onDone() {
      spinner.stop();
      printCreateSuccess(appId, appName, template);

      const needStartAns = await prompt.startApp();

      process.nextTick(() => {
        if (needStartAns.needStart) {
          startApp(appId);
        } else {
          process.exit(0);
        }
      });
    },
  });
}
