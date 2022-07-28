import _ from 'lodash';

const symbols = {
  unchanged: '  ',
  added: '+ ',
  removed: '- ',
  nested: '  ',
};

const makeIndent = (depth, spacesCount = 4, replacer = ' ') => replacer.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) return value;
  const nestedStruct = Object.entries(value).map(([key, val]) => `${makeIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${nestedStruct.join('\n')}\n${makeIndent(depth - 1)}  }`;
};

const stylish = (obj, depth = 1) => {
  const indent = makeIndent(depth);
  switch (obj.status) {
    case 'unchanged':
    case 'added':
    case 'removed':
      return `${indent}${symbols[obj.status]}${obj.node}: ${stringify(obj.value, depth + 1)}`;
    case 'nested':
      return `${indent}${symbols[obj.status]}${obj.node}: {\n${obj.children.map((item) => stylish(item, depth + 1)).join('\n')}\n${indent}  }`;
    case 'updated':
      return `${indent}${symbols.removed}${obj.node}: ${stringify(obj.value, depth + 1)}`
        .concat('\n', `${indent}${symbols.added}${obj.node}: ${stringify(obj.value1, depth + 1)}`);
    default:
      throw new Error(`unknown status: ${obj.status}`);
  }
};

export default (processedAST) => `{\n${processedAST.map((obj) => stylish(obj)).join('\n').replace(',', '')}\n}`;
