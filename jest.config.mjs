import fs from 'node:fs';
import path from 'node:path';

import { PACKAGES_DIR } from './buildConfig/paths.mjs';

const packages = fs.readdirSync(PACKAGES_DIR).filter((name) => {
  return fs.lstatSync(path.join(PACKAGES_DIR, name)).isDirectory();
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

export default {
  verbose: true,
  projects: packages.map(makeJestProjectConfig),
};
