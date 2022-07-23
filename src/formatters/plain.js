import _ from 'lodash';

const specifyValue = (value) => {
  switch (value) {
    case true:
    case false:
    case null:
    case '[complex value]':
    case +value:
      return true;
    default:
      return false;
  }
};

const processNode = (obj, ancestry) => {
  const complexValue = _.isArray(obj.value) ? '[complex value]' : obj.value;
  const newComplexValue = _.isArray(obj.value1) ? '[complex value]' : obj.value1;
  const oldValue = specifyValue(complexValue) ? complexValue : `'${complexValue}'`;
  const newValue = specifyValue(newComplexValue) ? newComplexValue : `'${newComplexValue}'`;

  switch (obj.status) {
    case 'updated':
      return `Property '${ancestry}' was updated. From ${oldValue} to ${newValue}`;
    case 'added':
      return `Property '${ancestry}' was added with value: ${oldValue}`;
    case 'removed':
      return `Property '${ancestry}' was removed`;
    default:
      return '';
  }
};

const plain = (processedAST) => {
  const iter = (obj, ancestry = '') => {
    if (!_.isArray(obj)) {
      const updAncestry = ancestry ? `${ancestry}.${obj.node}` : obj.node;
      const currentNode = processNode(obj, updAncestry);
      if (!_.isArray(obj.value)) {
        return currentNode;
      }
      return [currentNode, ...iter(obj.value, updAncestry)].filter((item) => item).join('\n');
    }
    return obj.map((item) => iter(item, ancestry));
  };
  return iter(processedAST).join('\n');
};

export default plain;
