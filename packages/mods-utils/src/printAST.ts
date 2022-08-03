import * as core from 'jscodeshift/src/core';

export const printAST = (path) => console.log('\n\n', core(path).toSource());
