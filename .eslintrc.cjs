/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'prettier',
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],
  rules: {},
};
