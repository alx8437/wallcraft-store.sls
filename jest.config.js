const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/?(*.)(spec|category).(ts|tsx|js)?(x)'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testTimeout: 30000,
  coveragePathIgnorePatterns: ['<rootDir>/api/helper/logger.ts', '<rootDir>/api/helper/error-handler.ts']
};
