module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-undef': 0,
    'no-unused-vars': 2,
    'no-useless-escape': 0,
    'no-case-declarations': 0,
    'prettier/prettier': 2
  }
};
