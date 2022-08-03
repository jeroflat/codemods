const fs = require('node:fs');
const path = require('node:path');

// get all packages in monorepo
const packagesPath = path.resolve(__dirname, 'packages');

const packages = fs.readdirSync(packagesPath).filter((name) => {
  return fs.lstatSync(path.join(packagesPath, name)).isDirectory();
});

const makeJestProjectConfig = (pkgName) => ({
  displayName: pkgName,
  testEnvironment: 'node',
  testMatch: [
    `<rootDir>/packages/${pkgName}/**/?(*.)+(spec|test).[jt]s?(x)`,
    `<rootDir>/packages/${pkgName}/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}`,
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs', 'ts', 'tsx'],
});

module.exports = {
  verbose: true,
  projects: packages.map(makeJestProjectConfig),
};
