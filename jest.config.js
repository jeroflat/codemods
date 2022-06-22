const modsCjsPkg = require('./packages/mods-cjs/package.json');
const modsTsPkg = require('./packages/mods-ts/package.json');

module.exports = {
  verbose: true,
  projects: [
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
