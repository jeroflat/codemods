import { literal } from 'jscodeshift';
import type { FileInfo, API, Property, Identifier, MemberExpression } from 'jscodeshift';
import { anyPass, equals, pathSatisfies } from 'ramda';
import { buildProperty, buildStringLiteralProperty, isNullLiteral } from '@codemods/utils';
import type { PropertyValue } from '@codemods/utils';

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

/**
 * creates a function that makes an equality check againts
 * `fetch` member expression property name
 */
const testFetchMethod = (prop: string) =>
  pathSatisfies<string, MemberExpression>(equals(prop), ['property', 'name']);

const isGetBlobProperty = testFetchMethod('getBlob');

const isPostAndReceiveBlobProperty = testFetchMethod('postAndReceiveBlob');

const isPostMultipartFile = testFetchMethod('postMultipartFile');

const isPutMultipartFile = testFetchMethod('putMultipartFile');

const isMultipartFileMethod = anyPass([isPutMultipartFile, isPostMultipartFile]);

const renameFetchMethod = (node: MemberExpression, newName: string) =>
  ((node.property as Identifier).name = newName);

const blobResponseTypeProp = buildProperty('responseType', literal('blob'));

export const parser = 'ts';

export default function updateFunctionCall(fileInfo: FileInfo, api: API) {
  const { source } = fileInfo;

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

  // get the import's name for the imported module
  const importName =
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
          name: importName,
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
        const arg = args[idx + 1] as PropertyValue;

        if (arg && !isNullLiteral(arg)) {
          propertiesPapi.push(buildProperty(order, arg));
        }
      });

      if (fetchProperty) {
        if (isGetBlobProperty(fetchProperty)) {
          renameFetchMethod(node.callee as MemberExpression, 'get');

          propertiesPapi.push(blobResponseTypeProp);
        }

        if (isPostAndReceiveBlobProperty(fetchProperty)) {
          renameFetchMethod(node.callee as MemberExpression, 'post');

          propertiesPapi.push(blobResponseTypeProp);
        }

        if (isMultipartFileMethod(fetchProperty)) {
          const methodName = isPostMultipartFile(fetchProperty) ? 'post' : 'put';

          renameFetchMethod(node.callee as MemberExpression, methodName);

          propertiesPapi.push(
            buildProperty(
              'headers',
              j.objectExpression([
                buildStringLiteralProperty('Content-Type', j.stringLiteral('multipart/form-data')),
              ]),
            ),
          );
        }
      }

      node.arguments = [args[0], j.objectExpression(propertiesPapi)];

      return node;
    });

  return ast.toSource({ quote: 'single', trailingComma: true });
}
