/* eslint-disable no-undef */
// .eslintrc.cjs
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and disables conflicting rules
  ],
  rules: {
    'prettier/prettier': 'error', // Shows Prettier issues as ESLint errors
    // Add your own ESLint rules below if needed
  },
};
