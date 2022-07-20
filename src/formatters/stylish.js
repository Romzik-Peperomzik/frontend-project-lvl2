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
  const [node, value, newValue] = [obj.node, obj.value, obj.newValue];
  if (!nestedPart) {
    return `${negIndent}${node}: ${value}\n${posIndent}${node}: ${newValue}`;
  }
  return firstChildNested
    ? `${negIndent}${node}: {\n${nestedPart}\n${indent}}\n${posIndent}${node}: ${newValue}`
    : `${negIndent}${node}: ${value}\n${posIndent}${node}: {\n${nestedPart}\n${indent}}`;
};

const stylish = (arrayWithObjectsForFormatting, spacesCount = 4) => {
  const iter = (obj, depth = 1) => {
    const indentSize = depth * spacesCount;
    const indent = makeIndent(indentSize);
    const specIndent = makeIndent(indentSize, obj.status);

    if (obj.status === 'updated') {
      if (obj.children) {
        if (_.isArray(obj.value)) {
          const nestedPart = obj.value.map((item) => iter(item, depth + 1)).join('\n');
          return processUpdNode(obj, indentSize, indent, nestedPart, true);
        }
        const nestedPart = obj.newValue.map((item) => iter(item, depth + 1)).join('\n');
        return processUpdNode(obj, indentSize, indent, nestedPart);
      }
      return processUpdNode(obj, indentSize, indent);
    }
    return !obj.children
      ? `${specIndent}${obj.node}: ${obj.value}`
      : `${specIndent}${obj.node}: {\n${obj.value.map((item) => iter(item, depth + 1)).join('\n')}\n${indent}}`;
  };
  const result = arrayWithObjectsForFormatting.map((obj) => iter(obj));
  return `{\n${result.join('\n').replace(',', '')}\n}`;
};

export default stylish;
