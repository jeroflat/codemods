import type { Transform } from 'jscodeshift';
import { runTest } from '@codemods/mods-utils';

/**
 * @link https://github.com/facebook/jscodeshift/blob/main/README.md#es-modules
 */
import * as dataToSetupTransform from '../dataToSetup';

const transformOptions = {};

runTest(__dirname, 'converts `data` method to `setup`', dataToSetupTransform, 'DataToSetup');
