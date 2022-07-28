import _ from 'lodash';

const specifyValue = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const processNode = (obj, ancestry) => {
  const [value, value1] = [specifyValue(obj.value), specifyValue(obj.value1)];

  switch (obj.status) {
    case 'updated':
      return `Property '${ancestry}' was updated. From ${value} to ${value1}`;
    case 'added':
      return `Property '${ancestry}' was added with value: ${value}`;
    case 'removed':
      return `Property '${ancestry}' was removed`;
    case 'nested':
    case 'unchanged':
      return undefined;
    default:
      throw new Error(`unknown status: ${obj.status}`);
  }
};

const plain = (obj, ancestry = '') => {
  const updAncestry = ancestry ? `${ancestry}.${obj.node}` : obj.node;
  const currentNode = processNode(obj, updAncestry);
  if (!obj.children) {
    return currentNode;
  }
  const children = obj.children.map((child) => (plain(child, updAncestry))).filter((item) => item).join('\n');
  return [currentNode, children].filter((item) => item).join('\n');
};

export default (processedAST) => processedAST.map((item) => plain(item)).join('\n');
