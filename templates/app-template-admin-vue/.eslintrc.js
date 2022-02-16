module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  extends: ['plugin:vue/base', 'prettier'],
  rules: {
    // Eslint cannot not handle import a type and may report no-unused-vars
    // when use that type. The bug affects the usage of type annotation
    // on props of components. Therefore, the rule is disabled until upstream
    // fixes the issue.
    // see https://github.com/typescript-eslint/typescript-eslint/issues/1542
    'no-unused-vars': 'off'
  },
};
