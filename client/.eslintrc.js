module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/prop-types': 0,
    'no-undef': 0,
    'no-unused-vars': 2,
    'no-useless-escape': 0,
    'no-case-declarations': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0,
    'react-hooks/exhaustive-deps': 2
  }
};
