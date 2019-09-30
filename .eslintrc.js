module.exports = {
  root: true,
  extends: 'standard',
  //plugins: ['react', 'jsdoc'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  globals: {
    window: true
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 规则文档：http://eslint.cn/docs/rules/
  rules: {
    // 0: 'off'
    // 1: 'warn'
    // 2: 'error
    // Common js rules
    'semi': 0,
    'quotes': 0,
    'space-before-function-paren': 0,
    'no-tabs': 0,
    'indent': 0,
    'eol-last': 0,
    'spaced-comment': 0,
    // 要求使用 === 和 !==
    'eqeqeq': 2,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 警告出现未使用过的变量
    'no-unused-vars': 1,
    // 要求构造函数首字母大写
    'new-cap': 2
  }
};
