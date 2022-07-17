import _ from 'lodash';

const processNode = (obj, ancestry) => {
  const [nodeName, status, value] = [obj.node, obj.status, obj.value];
  const complexValue = _.isArray(value) ? '[complex value]' : value;
  if (obj.status === 'updated') {
    const complexNewValue = _.isArray(obj.newValue) ? '[complex value]' : obj.newValue;
    return {
      [nodeName]: {
        ancestry, newValue: complexNewValue, status, value: complexValue,
      },
    };
  }
  return { [nodeName]: { ancestry, status, value: complexValue } };
};

const plain = (arrayWithObjectsForFormatting) => {
  const iter = (obj, ancestry = '') => {
    const updAncestry = ancestry ? `${ancestry}.${obj.node}` : obj.node;
    const currentNode = processNode(obj, updAncestry);
    if (!_.isArray(obj.value)) {
      return currentNode;
    }
    const valuesOfCurrentNode = obj.value.reduce((acc, node) => {
      const processedNodes = iter(node, updAncestry);
      return { ...acc, ...processedNodes };
    }, {});
    return { ...currentNode, ...valuesOfCurrentNode };
  };
  const result = arrayWithObjectsForFormatting.reduce((acc, obj) => ({ ...acc, ...iter(obj) }), {});
  return result;
};

export default plain;
