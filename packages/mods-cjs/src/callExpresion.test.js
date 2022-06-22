const { applyTransform } = require('jscodeshift/dist/testUtils');

const callExpressionTransform = require('./callExpresion');

const transformOptions = {};

describe('basics', () => {
  describe('call expression', () => {
    const source = `
      
    `;

    const output = `
    foo(bar);
    `;

    const expected = applyTransform(callExpressionTransform, transformOptions, { source });

    it('creates a function declaration with no return statement', () => {
      expect(output.trim()).toEqual(expected);
    });
  });
});
