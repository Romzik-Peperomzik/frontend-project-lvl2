import _ from 'lodash';

const makeSpecialIndent = (status, replacer, indentSize) => {
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

const stylish = (arrayWithObjectsForFormatting, replacer = ' ', spacesCount = 4) => {
  const iter = (obj, depth = 1) => {
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const specIndent = makeSpecialIndent(obj.status, replacer, indentSize);
    if (obj.status === 'updated') {
      const [updAddIndent, updMinusIndent] = specIndent;
      if (_.isArray(obj.value)) {
        const nestedObj = obj.value.map((item) => iter(item, depth + 1)).join('\n');
        return `${updMinusIndent}${obj.node}: {\n${nestedObj}\n${indent}}\n${updAddIndent}${obj.node}: ${obj.newValue}`;
      }
      if (_.isArray(obj.newValue)) {
        const nestedObj = obj.newValue.map((item) => iter(item, depth + 1)).join('\n');
        return `${updMinusIndent}${obj.node}: ${obj.value}\n${updAddIndent}${obj.node}: {\n${nestedObj}\n${indent}}`;
      }
      return `${updMinusIndent}${obj.node}: ${obj.value}\n${updAddIndent}${obj.node}: ${obj.newValue}`;
    }
    return !_.isArray(obj.value)
      ? `${specIndent}${obj.node}: ${obj.value}`
      : `${specIndent}${obj.node}: {\n${obj.value.map((item) => iter(item, depth + 1)).join('\n')}\n${indent}}`;
  };
  const result = arrayWithObjectsForFormatting.map((obj) => iter(obj));
  return `{\n${result.join('\n').replace(',', '')}\n}`;
};

export default stylish;
