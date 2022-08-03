import type { FileInfo, API, Identifier } from 'jscodeshift';

export default function variable(fileInfo: FileInfo, api: API) {
  const { source } = fileInfo;

  const j = api.jscodeshift;

  const root = j(source)
    .find(j.MemberExpression)
    .filter((path) => (path.node.property as Identifier).name === 'compose')
    .forEach((path) => {
      const objName = (path.node.object as Identifier).name;
      const scope = path.scope.lookup(objName);

      const bindings = scope.getBindings()[objName];

      // @ts-ignore TODO: extend typings to support this case.
      bindings.forEach((binding) => {
        const gp = binding.parent.parent.node;

        if (binding.node.name === 'Ramda' && gp.type === 'ImportDeclaration') {
          if (gp.source.value === 'ramda') {
            (path.node.property as Identifier).name = 'composeWith';
          }
        }
      });
    });

  return root.toSource({ quote: 'single', trailingComma: true });
}
