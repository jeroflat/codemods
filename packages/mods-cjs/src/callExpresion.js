module.exports = function (file, api) {
  const j = api.jscodeshift;

  const ast = j.callExpression(j.identifier('foo'), [j.identifier('bar')]);

  return j(ast).toSource();
};
