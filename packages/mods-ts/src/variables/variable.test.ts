// @ts-ignore
import { applyTransform } from 'jscodeshift/dist/testUtils';

import variableTransform from './variable';

const transformOptions = {};

describe('variables', () => {
  describe('creates a variable declaration', () => {
    const data = { identifier: 'foo' };

    const source = `
      
    `;

    const output = `
    const foo = 'bar';
    `;

    const expected = applyTransform(variableTransform, transformOptions, { source });

    it('creates a function declaration with no return statement', () => {
      expect(output.trim()).toEqual(expected);
    });
  });
});
