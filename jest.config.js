const modsCjsPkg = require('./packages/mods-cjs/package.json');
const modsTsPkg = require('./packages/mods-ts/package.json');
const utilsPkg = require('./packages/utils/package.json');

module.exports = {
  verbose: true,
  projects: [
    {
      displayName: utilsPkg.name,
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/utils/**/?(*.)+(spec|test).[jt]s?(x)'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
    },
    {
      displayName: modsCjsPkg.name,
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/basic-mods/**/?(*.)+(spec|test).[jt]s?(x)'],
    },
    {
      displayName: modsTsPkg.name,
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/mods-ts/**/?(*.)+(spec|test).[jt]s?(x)'],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
    },
  ],
};
