/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'txt'],
  moduleNameMapper: {
    '@helpers/(.*)': '<rootDir>/helpers/$1',
  },
};
