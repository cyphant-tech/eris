// a fork from sindresorhus
// https://github.com/sindresorhus/log-symbols/blob/master/index.js

import chalk from 'chalk';

const isSupported =
  process.platform !== 'win32' ||
  process.env.CI ||
  process.env.TERM === 'xterm-256color';

const main = {
  info: chalk.blue('ℹ'),
  success: chalk.green('✔'),
  warning: chalk.yellow('⚠'),
  error: chalk.red('✖'),
};

const fallbacks = {
  info: chalk.blue('i'),
  success: chalk.green('√'),
  warning: chalk.yellow('‼'),
  error: chalk.red('×'),
};

export default isSupported ? main : fallbacks;
