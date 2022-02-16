import inquirer from 'inquirer';
import { find } from '@/utils/common';

// prompt: input your appName
function appName(appId: string) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'appName',
      message: '请输入应用名称',
      default: appId,
      validate: (value: string) => {
        if (value && value.trim() !== '' && typeof value === 'string') {
          return true;
        }
        return '应用名称不能为空';
      },
    },
  ]);
}

interface InquirerAnswers {
  template?: string;
}

// prompt: select your template
async function template(templates: any, template?: string) {
  let tplAns: InquirerAnswers = {};
  if (!template) {
    tplAns = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: '请选择项目模板',
        choices: templates,
        filter: (val) => val.toLowerCase(),
      },
    ]);
  } else {
    tplAns = { template };
  }

  const tplOptions = find(templates, 'value', tplAns.template)[0].options;

  if (!tplOptions || tplOptions.length === 0) {
    return { ...tplAns };
  }

  const tplOptionsAns = await inquirer.prompt(tplOptions);

  return { ...tplAns, tplConfig: tplOptionsAns };
}

// prompt: start your app
function startApp() {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'needStart',
      message: '是否要启动应用',
      default: true,
    },
  ]);
}

export default {
  appName,
  template,
  startApp,
};
