import { applyTransform } from 'jscodeshift/dist/testUtils';

import renameMethodFromImport from './renameMethodFromImport';

const transformOptions = {};

describe.only('rename method from import', () => {
  const source = `
        import Ramda from 'ramda';
        import _ from 'lodash';

        Ramda.compose([f, g]);

        function meow() {
            Ramda.compose([f, g]);
        }

        function fn() {
            function innerFn() {
                Ramda.compose([f, g]);
            }
        }

        _.compose([f, g]);
    `;

  const output = `
        import Ramda from 'ramda';
        import _ from 'lodash';

        Ramda.composeWith([f, g]);

        function meow() {
            Ramda.composeWith([f, g]);
        }

        function fn() {
            function innerFn() {
                Ramda.composeWith([f, g]);
            }
        }

        _.compose([f, g]);
    `;

  const expected = applyTransform(renameMethodFromImport, transformOptions, { source });

  it(`renames Ramda's "compose" with "composeWith"`, () => {
    expect(output.trim()).toEqual(expected);
  });
});
