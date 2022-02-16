type CheckTypeFn = (target: any) => boolean;

interface CheckType {
  isString?: CheckTypeFn;
  isBoolean?: CheckTypeFn;
  isNumber?: CheckTypeFn;
  isArray?: CheckTypeFn;
  isFunction?: CheckTypeFn;
  isObject?: CheckTypeFn;
  isDate?: CheckTypeFn;
  isRegExp?: CheckTypeFn;
  isError?: CheckTypeFn;
  isNull?: CheckTypeFn;
  [key: string]: CheckTypeFn;
}

const checkType: CheckType = {};

function _isType(target: string, type: string) {
  return Object.prototype.toString.call(target) === `[object ${type}]`;
}

[
  'String',
  'Boolean',
  'Number',
  'Array',
  'Function',
  'Object',
  'Date',
  'RegExp',
  'Error',
  'Null',
].forEach((type) => {
  checkType[`is${type}`] = (target: string) => _isType(target, type);
});

export default checkType;
