import { property, identifier, stringLiteral } from 'jscodeshift';

export type PropertyValue = Parameters<typeof property>[1];

export const buildProperty = (name: string, value: PropertyValue) =>
  property('init', identifier(name), value);

export const buildStringLiteralProperty = (name: string, value: PropertyValue) =>
  property('init', stringLiteral(name), value);
