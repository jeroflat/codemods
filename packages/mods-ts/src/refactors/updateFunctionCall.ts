import type { FileInfo, API, NullLiteral, ASTNode, Property } from 'jscodeshift';

const isNullLiteral = (node: ASTNode): node is NullLiteral => node.type === 'NullLiteral';

const fetchApiOrder = [
  'params',
  'data',
  'timeout',
  'isRegularFile',
  'isCSVFile',
  'isResponseBlob',
  'extraConfig',
];

const specialMethods = [
  'getBlob',
  'postAndReceiveBlob',
  'postMultipartFile',
  'putMultipartFile',
  'putCSVFile',
];

export const parser = 'ts';

export default function updateFunctionCall(fileInfo: FileInfo, api: API) {
  const { source } = fileInfo;

  type ValueParam = Parameters<typeof j.property>[1];

  const buildProperty = (name: string, value: ValueParam) =>
    j.property('init', j.identifier(name), value);

  const j = api.jscodeshift;

  const root = j(source);

  // find declaration for "@/api/fetch" import
  const importDeclaration = root
    .find(j.ImportDeclaration, {
      source: {
        value: '@/api/fetch',
      },
    })
    .replaceWith((importPath) => {
      const { node } = importPath;

      node.source = j.literal('@/modules/fetch');

      return node;
    });

  // get the local name for the imported module
  const localName =
    // find the Identifiers
    // get the Node in the NodePath and grab its "name"
    importDeclaration
      .find(j.Identifier)
      // get the first NodePath from the Collection
      .get(0).node.name;

  const ast = root
    .find(j.CallExpression, {
      callee: {
        type: 'MemberExpression',
        object: {
          name: localName,
        },
      },
    })
    .replaceWith((fetchPath) => {
      const { node } = fetchPath;
      const { arguments: args } = node;
      // this is a 'get' call, so we don't change anything.
      if (args.length === 1) {
        return fetchPath.node;
      }

      const url = args[0];

      let propertiesPapi: Property[] = [];

      fetchApiOrder.forEach((order, idx) => {
        const arg = args[idx + 1] as ValueParam;

        if (arg && !isNullLiteral(arg)) {
          propertiesPapi.push(buildProperty(order, arg));
        }
      });

      node.arguments = [url, j.objectExpression(propertiesPapi)];

      return node;
    });

  return ast.toSource({ quote: 'single', trailingComma: true });
}
