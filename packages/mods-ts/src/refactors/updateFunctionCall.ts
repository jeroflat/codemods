import type {
  FileInfo,
  API,
  NullLiteral,
  ASTNode,
  Property,
  Identifier,
  MemberExpression,
} from 'jscodeshift';
import { printAST } from '@codemods/utils';

const isNullLiteral = (node: ASTNode): node is NullLiteral => node.type === 'NullLiteral';

const isGetBlobProperty = (node: MemberExpression) =>
  (node.property as Identifier).name === 'getBlob';

const renameFetchMethod = (node: MemberExpression, newName: string) =>
  ((node.property as Identifier).name = newName);

const fetchApiOrder = [
  'params',
  'data',
  'timeout',
  'isRegularFile',
  'isCSVFile',
  'isResponseBlob',
  'extraConfig',
];

const specialFetchCalls = [
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

      const memberExpressionsNodes = j(node)
        .find(j.MemberExpression, {
          property: {
            type: 'Identifier',
          },
        })
        .nodes();

      const fetchProperty = memberExpressionsNodes.find((node) =>
        specialFetchCalls.includes((node.property as Identifier).name),
      );

      // this is a 'get' call, so we don't change anything.
      if (args.length === 1) {
        return fetchPath.node;
      }

      let propertiesPapi: Property[] = [];

      fetchApiOrder.forEach((order, idx) => {
        const arg = args[idx + 1] as ValueParam;

        if (arg && !isNullLiteral(arg)) {
          propertiesPapi.push(buildProperty(order, arg));
        }
      });

      if (fetchProperty) {
        if (isGetBlobProperty(fetchProperty)) {
          renameFetchMethod(node.callee as MemberExpression, 'get');

          propertiesPapi.push(buildProperty('responseType', j.literal('blob')));
        }
      }

      node.arguments = [args[0], j.objectExpression(propertiesPapi)];

      return node;
    });

  return ast.toSource({ quote: 'single', trailingComma: true });
}
