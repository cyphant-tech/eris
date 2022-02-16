import * as style from './style';
import logSymbols from './log_symbols';

export function logInfo(text: string) {
  console.log(logSymbols.info, `${style.info(text)}`);
}

export function logSuccess(text: string) {
  console.log(logSymbols.success, style.success(text));
}

export function logWarning(text: string) {
  console.log(logSymbols.warning, style.warning(text));
}

export function logError(text: string) {
  console.log(logSymbols.error, style.error(text));
}
