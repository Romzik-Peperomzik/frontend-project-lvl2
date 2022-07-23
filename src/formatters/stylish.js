import _ from 'lodash';

const makeIndent = (indentSize, status = null, replacer = ' ') => {
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

const processUpdNode = (obj, indentSize, indent, nestedPart = false, firstChildNested = false) => {
  const [negIndent, posIndent] = [makeIndent(indentSize, 'removed'), makeIndent(indentSize, 'added')];
  const [node, value, value1] = [obj.node, obj.value, obj.value1];
  if (!nestedPart) {
    return `${negIndent}${node}: ${value}\n${posIndent}${node}: ${value1}`;
  }
  return firstChildNested
    ? `${negIndent}${node}: {\n${nestedPart}\n${indent}}\n${posIndent}${node}: ${value1}`
    : `${negIndent}${node}: ${value}\n${posIndent}${node}: {\n${nestedPart}\n${indent}}`;
};

const stylish = (processedAST, spacesCount = 4) => {
  const iter = (obj, depth = 1) => {
    const indentSize = depth * spacesCount;
    const indent = makeIndent(indentSize);
    const specIndent = makeIndent(indentSize, obj.status);

    if (obj.status === 'updated') {
      if (_.isArray(obj.value)) {
        const nestedPart = obj.value.map((item) => iter(item, depth + 1)).join('\n');
        return processUpdNode(obj, indentSize, indent, nestedPart, true);
      }
      if (_.isArray(obj.value1)) {
        const nestedPart = obj.value1.map((item) => iter(item, depth + 1)).join('\n');
        return processUpdNode(obj, indentSize, indent, nestedPart);
      }
      return processUpdNode(obj, indentSize, indent);
    }
    return !_.isArray(obj.value) // !obj.children
      ? `${specIndent}${obj.node}: ${obj.value}`
      : `${specIndent}${obj.node}: {\n${obj.value.map((item) => iter(item, depth + 1)).join('\n')}\n${indent}}`;
  };
  const result = processedAST.map((obj) => iter(obj));
  return `{\n${result.join('\n').replace(',', '')}\n}`;
};

export default stylish;
