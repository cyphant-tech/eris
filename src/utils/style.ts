import chalk from 'chalk';

// info: blue
// success: green
// warning: yellow
// error: red
export function info(text: string) {
  return chalk.blue(text);
}

export function success(text: string) {
  return chalk.green(text);
}

export function warning(text: string) {
  return chalk.yellow(text);
}

export function error(text: string) {
  return chalk.red(text);
}

export function red(text: string) {
  return chalk.red(text);
}

export function redBold(text: string) {
  return chalk.red.bold(text);
}

export function green(text: string) {
  return chalk.green(text);
}

export function greenBold(text: string) {
  return chalk.green.bold(text);
}

export function yellow(text: string) {
  return chalk.yellow(text);
}

export function yellowBold(text: string) {
  return chalk.yellow.bold(text);
}
