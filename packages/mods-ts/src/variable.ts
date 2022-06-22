import type { FileInfo, API } from 'jscodeshift';

export default function variable(fileInfo: FileInfo, api: API) {
  const j = api.jscodeshift;

  const ast = j.variableDeclaration('const', [
    j.variableDeclarator(j.identifier('foo'), j.literal('bar')),
  ]);

  return j(ast).toSource({ quote: 'single', trailingComma: true });
}
