import assert from 'node:assert';
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'graceful-fs';

import { PACKAGE_JSON } from './consts.mjs';
import { getPackagesAbsolutePaths } from './utils.mjs';

const require = createRequire(import.meta.url);
const rootPackage = require(`../${PACKAGE_JSON}`);

function updatePkgEngines() {
  const packages = getPackagesAbsolutePaths();

  packages.forEach((packageDir) => {
    const pkg = require(`${packageDir}/${PACKAGE_JSON}`);

    if (!pkg.engines) {
      pkg.engines = rootPackage.engines;

      fs.writeFileSync(path.resolve(packageDir, PACKAGE_JSON), JSON.stringify(pkg, null, 2));
    }
  });
}

updatePkgEngines();
