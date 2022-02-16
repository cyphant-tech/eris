/* eslint-disable no-prototype-builtins */
import checkType from './check_type';

type AnyObj = { [key: string]: any };

export function find(arrObj: AnyObj[], key: string, val: any) {
  if (!checkType.isArray(arrObj)) return;

  const result: { [key: string]: any }[] = [];

  arrObj.forEach((item) => {
    if (item.hasOwnProperty(key) && item[key] === val) {
      result.push(item);
    }
  });

  return result;
}
