import _ from 'lodash';

const makeIndent = (depth, status = null, spacesCount = 4, replacer = ' ') => {
  const indentSize = depth * spacesCount;
  switch (status) {
    case 'removed':
      return `${replacer.repeat(indentSize - 2)}- `;
    case 'added':
      return `${replacer.repeat(indentSize - 2)}+ `;
    case 'updated':
      return [`${replacer.repeat(indentSize - 2)}+ `, `${replacer.repeat(indentSize - 2)}- `];
    default:
      return replacer.repeat(indentSize);
  }
};

const processUpdNode = (obj, depth, nestedPart = false, firstChildNested = false) => {
  const [indent, negIndent, posIndent] = [makeIndent(depth), makeIndent(depth, 'removed'), makeIndent(depth, 'added')];
  const [node, value, value1] = [obj.node, obj.value, obj.value1];

  if (!nestedPart) {
    return `${negIndent}${node}: ${value}\n${posIndent}${node}: ${value1}`;
  }
  return firstChildNested
    ? `${negIndent}${node}: {\n${nestedPart}\n${indent}}\n${posIndent}${node}: ${value1}`
    : `${negIndent}${node}: ${value}\n${posIndent}${node}: {\n${nestedPart}\n${indent}}`;
};

const stylish = (processedAST) => {
  const iter = (obj, depth = 1) => {
    const [indent, specIndent] = [makeIndent(depth), makeIndent(depth, obj.status)];
    if (obj.children) return `${specIndent}${obj.node}: {\n${obj.children.map((item) => iter(item, depth + 1)).join('\n')}\n${indent}}`;
    if (!obj.status) {
      return Object.keys(obj).map((key) => {
        if (!_.isPlainObject(obj[key])) return `${indent}${key}: ${obj[key]}`;
        return `${indent}${key}: {\n${iter(obj[key], depth + 1)}\n${indent}}`;
      }).join('\n');
    }
    if (obj.status === 'updated') {
      if (!_.isPlainObject(obj.value) && !_.isPlainObject(obj.value1)) {
        return processUpdNode(obj, depth);
      }
      return _.isPlainObject(obj.value)
        ? processUpdNode(obj, depth, iter(obj.value, depth + 1), true)
        : processUpdNode(obj, depth, iter(obj.value1, depth + 1));
    }
    return (!_.isPlainObject(obj.value))
      ? `${specIndent}${obj.node}: ${obj.value}`
      : `${specIndent}${obj.node}: {\n${iter(obj.value, depth + 1)}\n${indent}}`;
  };
  const result = processedAST.map((obj) => iter(obj));
  return `{\n${result.join('\n').replace(',', '')}\n}`;
};

export default stylish;
