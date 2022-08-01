import type {
  FileInfo,
  API,
  ObjectExpression,
  ObjectMethod,
  Identifier,
  Options,
} from 'jscodeshift';
import * as CompilerDom from '@vue/compiler-dom';
import type { TextNode, BaseElementNode, RootNode } from '@vue/compiler-dom';

/**
 * @link https://stackoverflow.com/a/51399781
 */
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type ObjectExpressionProperties = ArrayElement<ObjectExpression['properties']>;

const hasSetupMethod = (properties: ObjectExpression['properties']) =>
  properties.find((property) => {
    if (property.type === 'ObjectMethod' || property.type === 'ObjectProperty') {
      // ONLY ObjectMethod/ObjectProperty has `key` property
      if (property.key.type === 'Identifier') {
        return property.key.name === 'setup';
      }
    }
  });

const parseSFC = (source: string) => CompilerDom.parse(source);

const extractScriptTag = (rootNode: RootNode) =>
  // @ts-ignore - missing 'tag' property on TemplateChildNode
  rootNode.children.filter((child) => child.tag === 'script');

const getScriptTagContentFromSource = (source: string) => {
  const [scriptTag] = extractScriptTag(parseSFC(source));
  const [scriptTagChildren] = (scriptTag as BaseElementNode).children;

  return (scriptTagChildren as TextNode).content;
};

export const parser = 'ts';

export default function dataToSetup(fileInfo: FileInfo, api: API, options: Options) {
  const { source } = fileInfo;

  const scriptContent = getScriptTagContentFromSource(source);

  const j = api.jscodeshift;

  const root = j(scriptContent);

  return root.toSource({ quote: 'single', trailingComma: true });
}
