import * as prettier from 'prettier';
import * as fs from 'node:fs';
import * as path from 'node:path';

const root = path.resolve(__dirname, '../../../');
const prettierrcJson = '.prettierrc.json';

type PrettierConfig = Record<string, string | boolean | number>;

let defaultPrettierOpts: PrettierConfig = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
};

let prettierConfig: PrettierConfig;

try {
  const prettierrc = fs.readFileSync(`${root}/${prettierrcJson}`, 'utf-8');

  prettierConfig = JSON.parse(prettierrc);
} catch (err) {
  prettierConfig = defaultPrettierOpts;
}

export const format = (str: string) =>
  prettier.format(str, {
    ...prettierConfig,
    parser: 'babel-ts',
  });
