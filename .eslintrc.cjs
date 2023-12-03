/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [],
  rules: {}
}
