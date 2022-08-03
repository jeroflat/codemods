// @ts-ignore
import * as core from 'jscodeshift/src/core';
import type { ASTNode, ASTPath } from 'jscodeshift';

export const printAST = (path: ASTNode[] | ASTPath | ASTPath[]) =>
  // @ts-ignore
  console.log('\n\n', core(path).toSource());
