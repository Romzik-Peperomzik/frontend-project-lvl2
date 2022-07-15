import _ from 'lodash';

const processNode = (nodeName, value, status, ancestry) => {
  const newValue = _.isArray(value) ? '[complex value]' : value;
  return { [nodeName]: { ancestry, status, value: newValue } };
};

const plain = (arrayWithObjectsForFormatting) => {
  const iter = (obj, ancestry = '') => {
    const updAncestry = ancestry ? `${ancestry}.${obj.node}` : obj.node;
    const currentNode = processNode(obj.node, obj.value, obj.status, updAncestry);
    if (!_.isArray(obj.value)) {
      return currentNode;
    }
    const valuesOfCurrentNode = obj.value.reduce((acc, node) => {
      const processedNodes = iter(node, updAncestry);
      const nodesToUpdated = _.union(Object.keys.processedNodes, Object.keys.acc);
      if (nodesToUpdated.length > 0) {
        nodesToUpdated.forEach((item) => {
          const [newAncestry, , newValue] = processedNodes[item];
          processedNodes[item] = { ancestry: newAncestry, status: 'updated', value: newValue };
        });
      }
      return { ...acc, ...processedNodes };
    }, {});
    return { ...currentNode, ...valuesOfCurrentNode };
  };
  const result = arrayWithObjectsForFormatting.reduce((acc, obj) => ({ ...acc, ...iter(obj) }), {});
  return result;
};

export default plain;
