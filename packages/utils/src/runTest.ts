import * as fs from 'fs';
import * as path from 'path';
import { applyTransform } from 'jscodeshift/dist/testUtils';
import type { Transform } from 'jscodeshift';

type Transformation = { parser: string; default: Transform } | Transform;

export const runTest = (
  dirName: string,
  description: string,
  transformation: Transformation,
  fixtureName: string,
) => {
  const fixtureDir = path.resolve(dirName, '../__testfixtures__');
  const fixtureDirFiles = fs.readdirSync(fixtureDir);

  const fixturesPaths = fixtureDirFiles
    .filter((file) => file.includes(fixtureName))
    .map((fn) => path.resolve(fixtureDir, fn));

  interface Fixtures {
    inputPath: string;
    outputPath: string;
  }

  const fixtures = fixturesPaths.reduce((prev, fp) => {
    const [, type] = fp.split('.');

    return {
      ...prev,
      [`${type}Path`]: fp,
    };
  }, {} as Fixtures);

  test(description, () => {
    const { inputPath, outputPath } = fixtures;

    const fileInfo = {
      path: inputPath,
      source: fs.readFileSync(inputPath).toString(),
    };

    expect(applyTransform(transformation, {}, fileInfo)).toEqual(
      fs.readFileSync(outputPath).toString(),
    );
  });
};
