const utilsPkg = require('./packages/utils/package.json');
const modsCjsPkg = require('./packages/mods-cjs/package.json');
const modsTsPkg = require('./packages/mods-ts/package.json');
const modsVuePkg = require('./packages/mods-vue/package.json');

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
    {
      displayName: modsVuePkg.name,
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/packages/mods-vue/**/?(*.)+(spec|test).[jt]s?(x)',
        '<rootDir>/packages/mods-vue/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
      ],
      transform: {
        '^.+\\.tsx?$': 'ts-jest',
      },
    },
  ],
};
