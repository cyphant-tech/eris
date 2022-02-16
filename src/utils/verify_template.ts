import { find } from './common';

export default function (type: string, tplName: string, tpls: any[]) {
  if (!tpls) {
    return false;
  }

  if (find(tpls, 'value', tplName).length > 0) {
    return true;
  }

  return false;
}
