module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'no-undef': 0,
    'no-unused-vars': 2,
    'no-useless-escape': 0,
    'no-case-declarations': 0,
    'prettier/prettier': 2
  }
};
