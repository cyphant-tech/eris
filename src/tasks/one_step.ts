import inquirer from 'inquirer';
import verifyApp from '@/utils/verify_app';
import * as log from '@/utils/log';
import { find } from '@/utils/common';
import helpExamples from '@/cli/help_examples';

const getCommandQuestions = () => [
  {
    type: 'list',
    name: 'command',
    message: '请选择需要执行的操作',
    choices: [
      {
        name: '创建应用',
        value: 'create',
      },
      {
        name: '启动应用',
        value: 'start',
      },
      {
        name: '打包应用',
        value: 'build',
      },
      {
        name: '删除应用',
        value: 'delete_app',
      },
      {
        name: '查看帮助',
        value: 'help',
      },
      {
        name: '退出',
        value: 'exit',
      },
    ],
    filter: (val: string) => val.toLowerCase(),
  },
];

const getAppInfoQuestions = () => [
  {
    type: 'input',
    name: 'appId',
    message: '请输入应用ID（即目录名称，例如 my-app）',
    validate: (value: string) => {
      if (value.trim() !== '' && verifyApp(value)) {
        return true;
      }

      return '应用ID不合法或者重复，换一个试试';
    },
  },
  {
    type: 'input',
    name: 'appName',
    message: '请输入应用名称',
    validate: (value: string) => {
      if (value.trim() !== '') {
        return true;
      }
      return '应用名称不能为空';
    },
  },
];

const getStartQuestions = () => [
  {
    type: 'input',
    name: 'appId',
    message: '请输入应用ID',
    validate: (value: string) => {
      if (value.trim() !== '') {
        return true;
      }

      return '应用ID不能为空';
    },
  },
];

const getAppidQuestions = () => [
  {
    type: 'input',
    name: 'appId',
    message: '请输入应用ID',
    validate: (value: string) => {
      if (value.trim() !== '') {
        return true;
      }

      return '应用ID不能为空';
    },
  },
  {
    type: 'list',
    name: 'buildEnv',
    message: '请选择打包方式',
    choices: [
      {
        name: '测试环境',
        value: 'testing',
      },
      {
        name: '生产环境',
        value: 'production',
      },
    ],
  },
];
const delAppidQuestions = () => [
  {
    type: 'input',
    name: 'appId',
    message: '请输入应用ID',
    validate: (value: string) => {
      if (value.trim() !== '') {
        return true;
      }

      return '应用ID不能为空';
    },
  },
];

async function oneStep(options: any) {
  // select action: create, start, build...
  const commandAns = await inquirer.prompt(getCommandQuestions());
  const { command } = commandAns;

  switch (command) {
    case 'create':
      return handleCreate(options);
    case 'start':
      return handleStart();
    case 'build':
      return handleBuild();
    case 'delete_app':
      return handleDeleteApp();
    case 'help':
      helpExamples();
      process.exit(0);
      break;
    case 'exit':
      log.logInfo('Tips: 中途随时都可以按【Ctrl + C】退出');
      process.exit(0);
      break;
    default:
      process.exit(0);
  }
}

// interface HandleCreate {
//   options: any;
//   template?: string;
// }
interface InquirerAnswers {
  template?: string;
}
async function handleCreate(options: any, template?: string) {
  const appInfoAns = await inquirer.prompt(getAppInfoQuestions());

  let tplAns: InquirerAnswers = {};
  const appTemplates = options.templates.app;

  if (!template) {
    tplAns = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: '请选择应用模板',
        choices: appTemplates,
        filter: (val) => val.toLowerCase(),
      },
    ]);
  } else {
    tplAns = { template };
  }

  const tplOptions = find(appTemplates, 'value', tplAns.template)[0].options;

  if (!tplOptions || tplOptions.length === 0) {
    return { ...appInfoAns, ...tplAns, command: 'create' };
  }

  const tplOptionsAns = await inquirer.prompt(tplOptions);

  return {
    ...appInfoAns,
    ...tplAns,
    tplConfig: tplOptionsAns,
    command: 'create',
  };
}

async function handleStart() {
  const appIdAns = await inquirer.prompt(getStartQuestions());
  return { ...appIdAns, command: 'start' };
}

async function handleBuild() {
  const appIdAns = await inquirer.prompt(getAppidQuestions());
  return { ...appIdAns, command: 'build' };
}

async function handleDeleteApp() {
  const appIdAns = await inquirer.prompt(delAppidQuestions());
  return { ...appIdAns, command: 'delete_app' };
}

export default oneStep;
