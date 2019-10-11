module.exports = {
  root: true,
  extends: ['standard', 'plugin:vue/recommended'],
  plugins: ['vue', 'html'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  globals: {
    window: true,
    Vue: true,
    VueRouter: true,
    $http: true
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
    'object-curly-spacing': 0,
    'dot-notation': 0,
    'import/first': 0,
    'keyword-spacing': 0,
    'key-spacing': 0,
    'no-new': 0,
    'quote-props': 0,
    'no-mixed-spaces-and-tabs': 0,
    'standard/no-callback-literal': 0,
    // 要求使用 === 和 !==
    'eqeqeq': 2,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 警告出现未使用过的变量
    'no-unused-vars': 1,
    // 要求构造函数首字母大写
    'new-cap': 2,
    // 屏蔽vue缩进校验
    'vue/html-indent': 0,
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0,
    'vue/name-property-casing': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/attributes-order': 0,
    'vue/no-use-v-if-with-v-for': 0
  }
};
