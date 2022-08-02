import type { NullLiteral, ASTNode } from 'jscodeshift';

export const isNullLiteral = (node: ASTNode): node is NullLiteral => node.type === 'NullLiteral';
