import _ from 'lodash';

const stylish = (arrayWithObjectsForFormatting, replacer = ' ', spacesCount = 4) => {
  const iter = (obj, depth = 1) => {
    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    let specIndent;
    switch (obj.status) {
      case 'removed':
        specIndent = `${replacer.repeat(indentSize - 2)}- `;
        break;
      case 'added':
        specIndent = `${replacer.repeat(indentSize - 2)}+ `;
        break;
      default:
        specIndent = replacer.repeat(indentSize);
        break;
    }
    return !_.isArray(obj.value)
      ? `${specIndent}${obj.node}: ${obj.value}`
      : `${specIndent}${obj.node}: {\n${obj.value.map((item) => iter(item, depth + 1)).join('\n')}\n${indent}}`;
  };
  const result = arrayWithObjectsForFormatting.map((obj) => iter(obj));
  return `{\n${result.join('\n').replace(',', '')}\n}`;
};

export default stylish;
