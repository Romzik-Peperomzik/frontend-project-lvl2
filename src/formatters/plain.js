import _ from 'lodash';

const specifyValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const plain = (obj, ancestry = '') => {
  const updAncestry = ancestry ? `${ancestry}.${obj.node}` : obj.node;
  const [value, value1] = [specifyValue(obj.value), specifyValue(obj.value1)];

  switch (obj.status) {
    case 'updated':
      return `Property '${updAncestry}' was updated. From ${value} to ${value1}`;
    case 'added':
      return `Property '${updAncestry}' was added with value: ${value}`;
    case 'removed':
      return `Property '${updAncestry}' was removed`;
    case 'nested':
      return obj.children
        .map((child) => (plain(child, updAncestry)))
        .filter((item) => item)
        .join('\n');
    case 'unchanged':
      return undefined;
    default:
      throw new Error(`unknown status: ${obj.status}`);
  }
};

export default (processedAST) => processedAST.map((item) => plain(item)).join('\n');
